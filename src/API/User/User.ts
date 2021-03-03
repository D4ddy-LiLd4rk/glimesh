import { callApi } from "../apiCall";
import { UserResolvable } from "../../Tools";
import { GlimeshObject } from "../GlimeshObject";
import { UserSocial } from "./UserSocial";

export class User extends GlimeshObject {
    avatar?: string;
    confirmedAt?: Date;
    displayname?: string;
    id?: number;
    profileContentHtml?: string;
    profileContentMd?: String;
    socials?: UserSocial[];
    username?: String;
    youtubeIntroUrl?: String;    

    init(): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let endPoint = `${(!this._param) ? "myself" : "user"}`;
                const options = this._createOptions(this._param);
                const clientId = this._client._authProvider.clientId;
                const convertedResponse = await callApi(options, clientId);

                this.avatar = convertedResponse.data[endPoint].avatar;
                this.confirmedAt = convertedResponse.data[endPoint].confirmedAt;
                this.displayname = convertedResponse.data[endPoint].displayname;
                this.id = convertedResponse.data[endPoint].id;
                this.profileContentHtml = convertedResponse.data[endPoint].profileContentHtml;
                this.profileContentMd = convertedResponse.data[endPoint].profileContentMd;
                //this.socials = convertedResponse.data.user.socials;
                this.username = convertedResponse.data[endPoint].username;
                this.youtubeIntroUrl = convertedResponse.data[endPoint].youtubeIntroUrl;

                resolve(this);
            } catch (err) {
                reject(err);
            }
        });
    }

    _createDataQuery(userParam: UserResolvable): string {
        let endPoint = `${(!userParam) ? "myself" : "user"}`;
        let key = `${(typeof userParam === "string") ? "username" : "id"}`;
        let value = `${(typeof userParam === "string") ? `\"${userParam}\"` : `${userParam}`}`;
        return `
            query {
              ${endPoint}${(userParam) ? `(${key}: ${value})` : ""} {
                avatar,
                confirmedAt,
                displayname,
                id,
                profileContentHtml,
                profileContentMd,
                username,
                youtubeIntroUrl
              }
            }`;
    }
}

