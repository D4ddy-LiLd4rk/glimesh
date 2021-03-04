export interface UserIdResolvableType {
	id: string;
}

export interface UserNameResolvableType {
	name: string;
}

export type UserIdResolvable = string | number | UserIdResolvableType;

export type UserNameResolvable = string | UserNameResolvableType;

export function extractUserId(user: UserIdResolvable): string {
	if (typeof user === 'string') {
		return user;
	} else if (typeof user === 'number') {
		return user.toString(10);
	} else {
		return user.id;
	}
}

export function extractUserName(user: UserNameResolvable): string {
	return typeof user === 'string' ? user : user.name;
}