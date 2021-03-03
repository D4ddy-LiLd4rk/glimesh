import type { RequestInit as NodeRequestInit } from 'node-fetch';

/**
 * The endpoint to call, i.e. /kraken, /helix or a custom (potentially unsupported) endpoint.
 */
export enum ApiCallType {
	/**
	 * Call an authentication endpoint.
	 */
	Base,

	/**
	 * Call an authentication endpoint.
	 */
	Auth,

	/**
	 * Call a custom (potentially unsupported) endpoint.
	 */
	Custom
}

/**
 * Configuration for a single API call.
 */
export interface ApiCallOptions {
	/**
	 * The URL to request.
	 *
	 * If `type` is not `'custom'`, this is relative to the respective API root endpoint. Otherwise, it is an absoulte URL.
	 */
	url: string;

	/**
	 * The endpoint to call, i.e. /kraken, /helix or a custom (potentially unsupported) endpoint.
	 */
	type?: ApiCallType;

	/**
	 * The HTTP method to use. Defaults to `'GET'`.
	 */
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

	/**
	 * The query parameters to send with the API call.
	 */
	query?: Record<string, string | string[] | undefined>;

	/**
	 * The JSON body to send with the API call.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: any;

	/**
	 * The scope the request needs.
	 */
	scope?: string;

	/**
	 * Whether OAuth credentials should be generated and sent with the request. Defaults to `true`.
	 */
	auth?: boolean;
}

export type ApiCallFetchOptions = Omit<RequestInit | NodeRequestInit, 'headers' | 'method' | 'body'>;