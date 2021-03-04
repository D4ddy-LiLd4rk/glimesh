import { AuthProvider, AccessToken, AuthProviderTokenType, getTokenInfo } from "..";
import { AuthScopes, AuthScopeType } from "../../Tools";

/**
 * An auth provider that always returns the same initially given credentials.
 *
 * You are advised to roll your own auth provider that can handle scope upgrades,
 * or to plan ahead and supply only access tokens that account for all scopes
 * you will ever need.
 */
export class StaticAuthProvider implements AuthProvider {
	private readonly _clientId: string;
	private _accessToken?: AccessToken;
	private _scopes?: AuthScopeType[];

	/**
	 * The type of token the provider holds.
	 */
	readonly tokenType: AuthProviderTokenType;

	/**
	 * Creates a new auth provider with static credentials.
	 *
	 * @param clientId The client ID.
	 * @param accessToken The access token to provide.
	 *
	 * You need to obtain one using the [Glimesh OAuth flow](glimesh.github.io/api-docs/docs/authentication).
	 * @param scopes The scopes the supplied token has.
	 * @param tokenType The type of the supplied token.
	 */
	constructor(
		clientId: string,
		accessToken?: string | AccessToken,
		scopes?: AuthScopeType[],
		tokenType: AuthProviderTokenType = 'user'
	) {
		this._clientId = clientId || '';
		this.tokenType = tokenType;
		if (accessToken) {
			this._accessToken =
				typeof accessToken === 'string'
					? new AccessToken({
							access_token: accessToken,
							scope: scopes,
							refresh_token: ''
					  })
					: accessToken;
			this._scopes = scopes;
		}
	}

	/**
	 * Retrieves an access token.
	 *
	 * If the current access token does not have the requested scopes, this method throws.
	 * This makes supplying an access token with the correct scopes from the beginning necessary.
	 *
	 * @param scopes The requested scopes.
	 */
	async getAccessToken(scopes?: AuthScopeType | AuthScopeType[]): Promise<AccessToken | null> {
		if (scopes && scopes.length > 0) {
			if (!this._scopes) {
				if (!this._accessToken) {
					throw new Error('Auth provider has not been initialized with a token yet and is requesting scopes');
				}
				const tokenInfo = await getTokenInfo(this._accessToken.accessToken, this._clientId);
				this._scopes = tokenInfo.scopes;
			}
			if (typeof scopes === 'string') {
				scopes = scopes.split(' ');
			}
			if (scopes.some(scope => !this._scopes!.includes(scope))) {
				throw new Error(
					`This token does not have the requested scopes (${scopes.join(', ')}) and can not be upgraded.
If you need dynamically upgrading scopes, please implement the AuthProvider interface accordingly.`
				);
			}
		}

		return this._accessToken ?? null;
	}

	/** @private */
	setAccessToken(token: AccessToken): void {
		this._accessToken = token;
	}

	/**
	 * The client ID.
	 */
	get clientId(): string {
		return this._clientId;
	}

	/**
	 * The scopes that are currently available using the access token.
	 */
	get currentScopes(): string[] {
		return this._scopes ?? [];
	}
}