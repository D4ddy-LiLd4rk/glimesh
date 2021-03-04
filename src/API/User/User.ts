import { UserSocial } from "./UserSocial";
import { ApiClient } from "../../ApiClient";

export interface UserData {
	avatar: string;
    confirmedAt: Date;
    displayname: string;
    id: number;
    profileContentHtml: string;
    profileContentMd: string;
    socials: UserSocial[];
    username: string;
    youtubeIntroUrl: string;
}

export class User {
	/** @private */ protected readonly _data: UserData;
	protected readonly _client: ApiClient;

	/** @private */
	constructor(data: UserData, client: ApiClient) {
		this._data = data;
		this._client = client;
	}

    get avatar(): string {
        return this._data.avatar;
    }

    get confirmedAt(): Date {
        return this._data.confirmedAt;
    }

    get displayname(): string {
        return this._data.displayname;
    }

    get id(): number {
        return this._data.id;
    }

    get profileContentHtml(): string {
        return this._data.profileContentHtml;
    }

    get profileContentMd(): string {
        return this._data.profileContentMd;
    }

    get socials(): UserSocial[] {
        return this._data.socials;
    }

    get username(): string {
        return this._data.username;
    }

    get youtubeIntroUrl(): string {
        return this._data.youtubeIntroUrl;
    } 
}

