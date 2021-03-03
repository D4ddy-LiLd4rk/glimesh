import { ApiClient } from '../ApiClient';

/** @private */
export default class BaseAPI {
    protected readonly _client: ApiClient;
    constructor(client: ApiClient) {
        this._client = client;
    }
}
