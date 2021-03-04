import { ApiClient } from "../../ApiClient";
import { User } from "../User/User";

export interface FollowerData {
    hasLiveNotifications: boolean;
    id: number;
    insertedAt: Date;
    streamer: User;
    updatedAt: Date;
    user: User;
}

export class Follower {
	/** @private */ protected readonly _data: FollowerData;
    protected readonly _client: ApiClient;

    /** @private */
    constructor(data: FollowerData, client: ApiClient) {
        this._data = data;
        this._client = client;
    }

    get hasLiveNotifications(): boolean {
        return this._data.hasLiveNotifications;
    }

    get id(): number {
        return this._data.id;
    }

    get insertedAt(): Date {
        return this._data.insertedAt;
    }

    get streamer(): User {
        return this._data.streamer;
    }

    get updatedAt(): Date {
        return this._data.updatedAt;
    }

    get user(): User {
        return this._data.user;
    }
}