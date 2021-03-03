import { callApi, callApiRaw } from "./API/apiCall";
import { AuthProvider, ClientCredentialsAuthProvider, InvalidTokenError, InvalidTokenTypeError, TokenInfo, TokenInfoData } from "./Auth";
import { ApiCallFetchOptions, ApiCallOptions, ApiCallType } from "./Auth/ApiCallOptions";
import { transformApiResponse } from "./Auth/helpers";
import { ConfigError } from "./Errors/ConfigError";
import { HttpStatusCodeError } from "./Errors/HttpStatusCodeError";
import { UserAPI } from "./API/User/UserAPI";
import { CategoryAPI } from "./API/Category/CategoryAPI";
import { ChannelAPI } from "./API/Channel/ChannelAPI";
import { FollowerAPI } from "./API/Follower/FollowerAPI";
import { SubscriptionAPI } from "./API/Sub/SubscriptionAPI";
import { MyselfAPI } from "./API/User/MyselfAPI";

/**
 * Configuration for an {@ApiClient} instance.
 */
export interface ApiConfig {
    /**
     * An authentication provider that supplies tokens to the client.
     *
     * For more information, see the {@AuthProvider} documentation.
     */
    authProvider: AuthProvider;

    /**
     * Additional options to pass to the fetch method.
     */
    fetchOptions?: ApiCallFetchOptions;
}

export class ApiClient {
    private readonly _config: ApiConfig;

    /**
         * Creates a new API client instance.
         *
         * @param config Configuration for the client instance.
         */
    constructor(config: ApiConfig) {
        if (!(config as Partial<ApiConfig>).authProvider) {
            throw new ConfigError('No auth provider given. Please supply the `authProvider` option.');
        }

        this._config = config;
    }

    /**
     * Requests scopes from the auth provider.
     *
     * @param scopes The scopes to request.
     */
    async requestScopes(scopes: string[]): Promise<void> {
        await this._config.authProvider.getAccessToken(scopes);
    }



	/**
	 * Retrieves information about your access token.
	 */
	async getTokenInfo(): Promise<TokenInfo> {
		try {
			const data = await this.callApi<TokenInfoData>({ type: ApiCallType.Auth, url: 'validate' });
			return new TokenInfo(data);
		} catch (e) {
			if (e instanceof HttpStatusCodeError && e.statusCode === 401) {
				throw new InvalidTokenError();
			}
			throw e;
		}
	}

	/**
	 * Makes a call to the Twitch API using your access token.
	 *
	 * @param options The configuration of the call.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async callApi<T = any>(options: ApiCallOptions): Promise<T> {
		const { authProvider } = this._config;
		const shouldAuth = options.auth ?? true;
		let accessToken = shouldAuth
			? await authProvider.getAccessToken(options.scope ? [options.scope] : undefined)
			: null;
		if (!accessToken) {
			return callApi<T>(options, authProvider.clientId, undefined, this._config.fetchOptions);
		}

		if (accessToken.isExpired && authProvider.refresh) {
			const newAccessToken = await authProvider.refresh();
			if (newAccessToken) {
				accessToken = newAccessToken;
			}
		}

		let response = await this._callApiInternal(options, authProvider.clientId, accessToken.accessToken);
		if (response.status === 401 && authProvider.refresh) {
			await authProvider.refresh();
			accessToken = await authProvider.getAccessToken(options.scope ? [options.scope] : []);
			if (accessToken) {
				response = await this._callApiInternal(options, authProvider.clientId, accessToken.accessToken);
			}
		}

		return transformApiResponse<T>(response);
	}

	/** @private */
	get _authProvider(): AuthProvider {
		return this._config.authProvider;
	}

	private async _callApiInternal(options: ApiCallOptions, clientId?: string, accessToken?: string) {
		const { fetchOptions } = this._config;
        
        return callApiRaw(options, clientId, accessToken, fetchOptions);
	}

	get categories(): CategoryAPI {
		return new CategoryAPI(this);
	}

	get channels(): ChannelAPI {
		return new ChannelAPI(this);
	}

	get followers(): FollowerAPI {
		return new FollowerAPI(this);
	}

	get myself(): MyselfAPI {
		if (this._config.authProvider instanceof ClientCredentialsAuthProvider) {
			throw new InvalidTokenTypeError("Access Token needed!");
		}
		return new MyselfAPI(this);
	}

	get subscriptions(): SubscriptionAPI {
		return new SubscriptionAPI(this);
	}

    get users(): UserAPI {
        return new UserAPI(this);
    };
}