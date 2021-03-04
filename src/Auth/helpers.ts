import { AccessToken, AccessTokenData, TokenInfo, TokenInfoData, InvalidTokenError, AuthProvider } from ".";
import { callApi } from "../API/apiCall";
import { HttpStatusCodeError } from "../Errors/HttpStatusCodeError";
import { ApiCallType } from "./ApiCallOptions";

/**
 * Retrieves an access token with your client credentials and an authorization code.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param code The authorization code.
 * @param redirectUri The redirect URI. This serves no real purpose here, but must still match one of the redirect URIs you configured in the Glimesh Application dashboard.
 */
export async function exchangeCode(
	clientId: string,
	clientSecret: string,
	code: string,
	redirectUri: string
): Promise<AccessToken> {
	return new AccessToken(
		await callApi<AccessTokenData>({
			type: ApiCallType.Auth,
			url: 'token',
			method: 'POST',
			query: {
				grant_type: 'authorization_code',
				client_id: clientId,
				client_secret: clientSecret,
				code,
				redirect_uri: redirectUri
			}
		})
	);
}

/**
 * Retrieves an app access token with your client credentials.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param clientSecret
 */
export async function getAppToken(clientId: string, clientSecret: string): Promise<AccessToken> {
	return new AccessToken(
		await callApi<AccessTokenData>({
			type: ApiCallType.Auth,
			url: 'token',
			method: 'POST',
			query: {
				grant_type: 'authorization_code',
				client_id: clientId,
				client_secret: clientSecret
			}
		},
		clientId)
	);
}

/**
 * Refreshes an expired access token with your client credentials and the refresh token that was given by the initial authentication.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param refreshToken The refresh token.
 */
export async function refreshUserToken(
	clientId: string,
	clientSecret: string,
	refreshToken: string
): Promise<AccessToken> {
	return new AccessToken(
		await callApi<AccessTokenData>({
			type: ApiCallType.Auth,
			url: 'token',
			method: 'POST',
			query: {
				grant_type: 'refresh_token',
				client_id: clientId,
				client_secret: clientSecret,
				refresh_token: refreshToken
			}
		})
	);
}

/**
 * Revokes an access token.
 *
 * @param clientId The client ID of your application.
 * @param accessToken The access token.
 */
export async function revokeToken(clientId: string, accessToken: string): Promise<void> {
	await callApi({
		type: ApiCallType.Auth,
		url: 'revoke',
		method: 'POST',
		query: {
			client_id: clientId,
			token: accessToken
		}
	});
}

/**
 * Retrieves information about an access token.
 *
 * @param clientId The client ID of your application.
 * @param accessToken The access token to get the information of.
 */
export async function getTokenInfo(accessToken: string, clientId?: string): Promise<TokenInfo> {
	try {
		const data = await callApi<TokenInfoData>(
			{ type: ApiCallType.Auth, url: 'validate' },
			clientId,
			accessToken
		);
		return new TokenInfo(data);
	} catch (e) {
		if (e instanceof HttpStatusCodeError && e.statusCode === 401) {
			throw new InvalidTokenError();
		}
		throw e;
	}
}

/** @private */
export async function getValidTokenFromProvider(
	provider: AuthProvider,
	scopes?: string[]
): Promise<{ accessToken: AccessToken; tokenInfo: TokenInfo }> {
	let lastTokenError: InvalidTokenError | undefined = undefined;

	try {
		const accessToken = await provider.getAccessToken(scopes);
		if (accessToken) {
			// check validity
			const tokenInfo = await getTokenInfo(accessToken.accessToken);
			return { accessToken, tokenInfo };
		}
	} catch (e: unknown) {
		if (e instanceof InvalidTokenError) {
			lastTokenError = e;
		}
	}

	if (provider.refresh) {
		try {
			const newToken = await provider.refresh();

			if (newToken) {
				// check validity
				const tokenInfo = await getTokenInfo(newToken.accessToken);
				return { accessToken: newToken, tokenInfo };
			}
		} catch (e: unknown) {
			if (e instanceof InvalidTokenError) {
				lastTokenError = e;
			}
		}
	}

	throw lastTokenError ?? new Error('Could not retrieve a valid token');
}

/** @private */
export function getApiUrl(url: string, type: ApiCallType): string {
	switch (type) {
		case ApiCallType.Base:
			return `https://glimesh.tv/api`;
		case ApiCallType.Auth:
			return `https://glimesh.tv/oauth/authorize`;
		case ApiCallType.Custom:
			return url;
		default:
			return url;
	}
}

/** @private */
export async function transformApiResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new HttpStatusCodeError(response.status, response.statusText, await response.json());
	}

	if (response.status === 204) {
		return (undefined as unknown) as T; // oof
	}

    const text = await response.text();

	if (!text) {
		return (undefined as unknown) as T; // mega oof - glimesh doesn't return a response when it should
	}
	
	return JSON.parse(text) as T;
}