import BaseAPI from "../BaseAPI";
import { User } from "./User";

export class UserAPI extends BaseAPI {
    getUserById(userId: number): Promise<User | null> {
        return new User(userId, this._client).init();
    };

    getUserByName(userName: string): Promise<User | null> {
        return new User(userName, this._client).init();
    };
/*
    getUsersById(userIds: string[]): Promise<User[]> {
        return Promise.resolve([new User]);
    };

    getUsersByName(userNames: string[]): Promise<User[]> {
        return Promise.resolve([new User]);
    };*/
}