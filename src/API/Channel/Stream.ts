import { Category } from "../Category/Category";
import { Channel } from "./Channel";
import { ApiClient } from "../../ApiClient";

export interface StreamData {
	avgChatters: number;
    avgViewers: number;
    category: Category;
    channel: Channel;
    countChatters: number;
    countViewers: number;
    endedAt: Date;
    id: number;
    newSubscribers: number;
    peakChatters: number;
    peakViewers: number;
    resubSubscribers: number;
    startedAt: Date;
    title: string; 
}

export class Stream {
	/** @private */ protected readonly _data: StreamData;
	protected readonly _client: ApiClient;

	/** @private */
	constructor(data: StreamData, client: ApiClient) {
		this._data = data;
		this._client = client;
	}

    get avgChatters(): number {
        return this._data.avgChatters;
    }

    get avgViewers(): number {
        return this._data.avgViewers;
    }

    get category(): Category {
        return this._data.category;
    }

    get channel(): Channel {
        return this._data.channel;
    }

    get countChatters(): number {
        return this._data.countChatters;
    }

    get countViewers(): number {
        return this._data.countViewers;
    }

    get endedAt(): Date {
        return this._data.endedAt;
    }

    get id(): number {
        return this._data.id;
    }

    get newSubscribers(): number {
        return this._data.newSubscribers;
    }

    get peakChatters(): number {
        return this._data.peakChatters;
    }

    get peakViewers(): number {
        return this._data.peakViewers;
    }

    get resubSubscribers(): number {
        return this._data.resubSubscribers;
    }

    get startedAt(): Date {
        return this._data.startedAt;
    }

    get title(): string {
        return this._data.title;
    }
}