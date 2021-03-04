import { ApiClient } from "../../ApiClient";

export interface CategoryData {
	id: number;
    name: string;
    parent: Category;
    slug: string;
    tagName: string; 
}

export class Category {
	/** @private */ protected readonly _data: CategoryData;
	protected readonly _client: ApiClient;

	/** @private */
	constructor(data: CategoryData, client: ApiClient) {
		this._data = data;
		this._client = client;
	}

    get id(): number {
        return this._data.id;
    }

    get name(): string {
        return this._data.name;
    }

    get parent(): Category {
        return this._data.parent;
    }

    get slug(): string {
        return this._data.slug;
    }

    get tagName(): string {
        return this._data.tagName;
    }
}