import { stringify } from "querystring";
import { ApiCallOptions, ApiCallFetchOptions, ApiCallType } from "../Auth/ApiCallOptions";
import { getApiUrl, transformApiResponse } from "../Auth/helpers";
import fetch, { Headers } from "cross-fetch";
import { AuthProviderTokens } from "../Auth/AuthProvider/AuthProvider";

/**
 * Makes a call to the Glimesh API using the given credentials, returning the raw Response object.
 *
 * @param options
 * @param clientId
 * @param accessToken
 * @param fetchOptions
 */
export async function callApiRaw(
	options: ApiCallOptions,
	clientId?: string,
	accessToken?: string,
	fetchOptions: ApiCallFetchOptions = {}
): Promise<Response> {
	const type = options.type === undefined ? ApiCallType.Base : options.type;
	const url = getApiUrl(options.url, type);
	const params = stringify(options.query);
	const headers = new Headers();
	headers.append('Accept', 'application/json');
	//headers.append('Content-Type', 'application/json');

	if (accessToken) {
		headers.append('Authorization', `Bearer ${accessToken}`);
	} else if (clientId && type !== ApiCallType.Auth) {
		headers.append('Authorization', `Client-ID ${clientId}`);
	}

	const requestOptions: RequestInit = {
		...(fetchOptions as RequestInit),
		method: options.method ?? 'GET',
		headers,
		body: options.body
	};

	return fetch(params ? `${url}?${params}` : url, requestOptions);
}

/**
 * Makes a call to the Glimesh API using given credentials.
 *
 * @param options The configuration of the call.
 * @param clientId The client ID of your application.
 * @param accessToken The access token to call the API with.
 * @param fetchOptions Additional options to be passed to the `fetch` function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi<T = any>(
	options: ApiCallOptions,
	clientId?: string,
	accessToken?: string,
	fetchOptions: ApiCallFetchOptions = {}
): Promise<T> {
	const response = await callApiRaw(options, clientId, accessToken, fetchOptions);

	return transformApiResponse(response);
}