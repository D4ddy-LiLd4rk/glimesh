export interface GlimeshResponse<T> {
	data: {
		category?: T;
		categories?: T[];
		channel?: T;
		channels?: T[];
		user?: T;
		users?: T[];		
	};
}

export interface GlimeshPaginatedResponse<T> extends GlimeshResponse<T> {
	pagination?: {
		cursor: string;
	};
}

export interface GlimeshPaginatedResponseWithTotal<T> extends GlimeshPaginatedResponse<T> {
	total: number;
}