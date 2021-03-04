import { Category } from "../Category/Category";
import { Stream } from "./Stream";
import { User } from "../User/User";
import { ApiClient } from "../../ApiClient";

export interface ChannelData {
  category: Category;
  chatRulesHtml: string;
  chatRulesMd: string;
  id: number;
  inaccessible: boolean;
  language: string;
  status: ChannelStatus;
  stream: Stream;
  streamKey: string;
  streamer: User;
  thumbnail: string;
  title: string;
}

export class Channel {
	/** @private */ protected readonly _data: ChannelData;
  protected readonly _client: ApiClient;

  /** @private */
  constructor(data: ChannelData, client: ApiClient) {
    this._data = data;
    this._client = client;
  }

  get category(): Category {
    return this._data.category;
  }

  get chatRulesHtml(): string {
    return this._data.chatRulesHtml;
  }

  get chatRulesMd(): string {
    return this._data.chatRulesMd;
  }

  get id(): number {
    return this._data.id;
  }

  get inaccessible(): boolean {
    return this._data.inaccessible;
  }

  get language(): string {
    return this._data.language;
  }

  get status(): ChannelStatus {
    return this._data.status;
  }

  get stream(): Stream {
    return this._data.stream;
  }
  /*TODO: Check permissions
  get streamKey(): string {
      return this._data.streamKey;
  }*/

  get streamer(): User {
    return this._data.streamer;
  }

  get thumbnail(): string {
    return this._data.thumbnail;
  }

  get title(): string {
    return this._data.title;
  }

  get username(): string { return ""; }
}

enum ChannelStatus {
  Live = "LIVE",
  Offline = "OFFLINE"
}