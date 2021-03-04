export interface ChannelIdResolvableType {
	id: string;
}

export interface ChannelNameResolvableType {
	name: string;
}

export type ChannelIdResolvable = string | number | ChannelIdResolvableType;

export type ChannelNameResolvable = string | ChannelNameResolvableType;

export function extractChannelId(user: ChannelIdResolvable): string {
	if (typeof user === 'string') {
		return user;
	} else if (typeof user === 'number') {
		return user.toString(10);
	} else {
		return user.id;
	}
}

export function extractChannelName(user: ChannelNameResolvable): string {
	return typeof user === 'string' ? user : user.name;
}