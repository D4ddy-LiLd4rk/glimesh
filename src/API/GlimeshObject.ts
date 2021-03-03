import { ApiClient } from "../ApiClient";
import { ApiCallOptions } from "../Auth/ApiCallOptions";
import { Resolvable, UserResolvable } from "../Tools";

export abstract class GlimeshObject {
    _param: Resolvable;
    _client: ApiClient;
    
    constructor(param: Resolvable, client: ApiClient) {
        this._param = param;   
        this._client = client;    
    }

    _createOptions(param: Resolvable): ApiCallOptions {
        return {
            method: 'POST',
            body: this._createDataQuery(param),
            url: 'https://glimesh.tv/api'
        };
    }    

    abstract _createDataQuery(userParam: Resolvable): string;
}