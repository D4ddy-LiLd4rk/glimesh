import { CategoryResolvable } from "../../Tools";
import { callApi } from "../apiCall";
import { GlimeshObject } from "../GlimeshObject";

export class Category extends GlimeshObject {
    id?: number;
    name?: string;
    parent?: Category;
    slug?: string;
    tagName?: string;  

    init(): Promise<Category> {
        return new Promise(async (resolve, reject) => {
            try {
                const options = this._createOptions(this._param);
                const clientId = this._client._authProvider.clientId;
                const convertedResponse = await callApi(options, clientId);
                
                this.id = convertedResponse.data.category.id;
                this.name = convertedResponse.data.category.name;
                this.parent = convertedResponse.data.category.parent;
                this.slug = convertedResponse.data.category.slug;
                this.tagName = convertedResponse.data.category.tagName;

                resolve(this);
            } catch (err) {
                reject(err);
            }
        });
    }

    _createDataQuery(categoryParam: CategoryResolvable): string {
        return `
            query {
              category(slug: \"${categoryParam}\") {
                id,
                name,
                parent {
                    id
                },
                slug,
                tagName
              }
            }`;
    }

}