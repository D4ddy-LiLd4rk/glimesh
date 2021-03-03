import BaseAPI from "../BaseAPI";
import { StreamAPI } from "./StreamAPI";

export class ChannelAPI extends BaseAPI {

    get streams(): StreamAPI {
        return new StreamAPI(this._client);
    }
    
}