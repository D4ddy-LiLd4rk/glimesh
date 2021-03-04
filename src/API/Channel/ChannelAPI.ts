import { ApiCallType } from "../../Auth/ApiCallOptions";
import BaseAPI from "../BaseAPI";
import { GlimeshPaginatedResponse } from "../GlimeshResponse";
import { ChannelIdResolvable, ChannelNameResolvable, extractChannelId, extractChannelName } from "../Resolver/ChannelResolver";
import { Channel, ChannelData } from "./Channel";
import { StreamAPI } from "./StreamAPI";

export enum ChannelLookupType {
    Id = 'id',
    Username = 'username'
}

export class ChannelAPI extends BaseAPI {

    get streams(): StreamAPI {
        return new StreamAPI(this._client);
    }

    async getChannelById(channelId: ChannelIdResolvable): Promise<Channel | null> {
        const channels = await this._getCategories(ChannelLookupType.Id, [extractChannelId(channelId)]);
        return channels.length ? channels[0] : null;
    }

    async getChannelByName(channelName: ChannelNameResolvable): Promise<Channel | null> {
        const channels = await this._getCategories(ChannelLookupType.Username, [extractChannelName(channelName)]);
        return channels.length ? channels[0] : null;
    }

    getChannelsByIds(channelIds: ChannelIdResolvable[]): Promise<Channel[]> {
        return this._getCategories(ChannelLookupType.Id, channelIds.map(extractChannelId), true);
    }

    getChannelsByNames(channelNames: ChannelNameResolvable[]): Promise<Channel[]> {
        return this._getCategories(ChannelLookupType.Username, channelNames.map(extractChannelName), true);
    }

    async _getCategories(lookupType: ChannelLookupType, param: string[], multi: boolean = false): Promise<Channel[]> {
        if (param.length === 0) {
            return [];
        }
        const searchQuery = multi ? "channels" : `channel(${lookupType}: "${param}")`;
        const result = await this._client.callApi<GlimeshPaginatedResponse<ChannelData>>({
            method: "POST",
            type: ApiCallType.Base,
            url: 'channels',
            body: `
            query {
              ${searchQuery} {
                category {
                    id
                  }
                  chatRulesHtml
                  chatRulesMd
                  id
                  inaccessible
                  language
                  status
                  stream {
                    id
                  }
                  streamer {
                    id
                  }
                  thumbnail
                  title
                }
              }`
        });
        
        if (result.data.channels && multi) {
            let allChannels = result.data.channels.map(channelData => new Channel(channelData, this._client));
            let channels: Channel[] = [];
            param.forEach(value => {
                channels = new Array(...channels, ...(allChannels.filter(channel => channel[lookupType] === value)));
            });
            return channels;
        } else if (result.data.channel) {

            return [new Channel(result.data.channel, this._client)];

        } else {
            return [];
        }
    }
}