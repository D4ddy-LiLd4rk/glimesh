import { User } from "../..";
import { ApiCallType } from "../../Auth/ApiCallOptions";
import BaseAPI from "../BaseAPI";
import { GlimeshPaginatedResponse } from "../GlimeshResponse";
import { Stream, StreamData } from "./Stream";

export enum StreamLookupType {
    Id = 'id'
}

export class StreamAPI extends BaseAPI {
    


    private async _getStreams(lookupType: StreamLookupType, param: string[], multi: boolean = false): Promise<Stream[]> {
        if (param.length === 0) {
            return [];
        }
        const searchQuery = multi ? "streams" : `stream(${lookupType}: "${param}")`;
        const result = await this._client.callApi<GlimeshPaginatedResponse<StreamData>>({
            method: "POST",
            type: ApiCallType.Base,
            url: 'users',
            body: `
            query {
               ${searchQuery} {
                avgChatters,
                avgViewers,
                countChatters,
                countViewers,
                endedAt,
                id,
                newSubscribers,
                peakChatters,
                peakViewers,
                resubSubscribers,
                startedAt,
                title
              }
            }`
        });

        if (result.data.streams && multi) {
            let allStreams = result.data.streams.map(userData => new Stream(userData, this._client));
            let streams: Stream[] = [];
            param.forEach(value => {
                //streams = new Array(...streams, ...(allStreams.filter(stream => stream[lookupType] === value)));
            });
            return streams;
        } else if (result.data.user) {

            return [new Stream(result.data.user, this._client)];

        } else {
            return [];
        }
    }
}