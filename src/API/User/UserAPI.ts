import { ApiCallType } from "../../Auth/ApiCallOptions";
import BaseAPI from "../BaseAPI";
import { GlimeshPaginatedResponse } from "../GlimeshResponse";
import { UserIdResolvable, extractUserId, UserNameResolvable, extractUserName } from "../Resolver/UserResolver";
import { User, UserData } from "./User";

export enum UserLookupType {
    Id = 'id',
    Username = 'username'
}

export class UserAPI extends BaseAPI {
    async getUserById(userId: UserIdResolvable): Promise<User | null> {
        const users = await this._getUsers(UserLookupType.Id, [extractUserId(userId)]);
        return users.length ? users[0] : null;
    }

    async getUserByName(userName: UserNameResolvable): Promise<User | null> {
        const users = await this._getUsers(UserLookupType.Username, [extractUserName(userName)]);
        return users.length ? users[0] : null;
    }

    getUsersByIds(userIds: UserIdResolvable[]): Promise<User[]> {
        return this._getUsers(UserLookupType.Id, userIds.map(extractUserId), true);
    }

    getUsersByNames(userNames: UserNameResolvable[]): Promise<User[]> {
        return this._getUsers(UserLookupType.Username, userNames.map(extractUserName), true);
    }

    private async _getUsers(lookupType: UserLookupType, param: string[], multi: boolean = false): Promise<User[]> {
        if (param.length === 0) {
            return [];
        }
        const searchQuery = multi ? "users" : `user(${lookupType}: "${param}")`;
        const result = await this._client.callApi<GlimeshPaginatedResponse<UserData>>({
            method: "POST",
            type: ApiCallType.Base,
            url: 'users',
            body: `
            query {
               ${searchQuery} {
                avatar,
                confirmedAt,
                displayname,
                id,
                profileContentHtml,
                profileContentMd,
                username,
                youtubeIntroUrl
              }
            }`
        });

        if (result.data.users && multi) {
            let allUsers = result.data.users.map(userData => new User(userData, this._client));
            let users: User[] = [];
            param.forEach(value => {
                users = new Array(...users, ...(allUsers.filter(user => user[lookupType] === value)));
            });
            return users;
        } else if (result.data.user) {

            return [new User(result.data.user, this._client)];

        } else {
            return [];
        }
    }
}