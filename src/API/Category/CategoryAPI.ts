import { ApiCallType } from "../../Auth/ApiCallOptions";
import BaseAPI from "../BaseAPI";
import { GlimeshPaginatedResponse } from "../GlimeshResponse";
import { CategoryNameResolvable, extractCategoryName, CategoryIdResolvable, extractCategoryId, CategorySlugResolvable, extractCategorySlug } from "../Resolver/CategoryResolver";
import { User } from "../User/User";
import { Category, CategoryData } from "./Category";

export enum CategoryLookupType {
    Id = 'id',
    Name = 'name',
    Slug = 'slug'
}

export class CategoryAPI extends BaseAPI {
    /*async getCategoryById(categoryId: CategoryIdResolvable): Promise<Category | null> {
        const categories = await this._getCategories(CategoryLookupType.Id, [extractCategoryId(categoryId)]);
        return categories.length ? categories[0] : null;
    }

    async getCategoryByName(categoryName: CategoryNameResolvable): Promise<Category | null> {
        const categories = await this._getCategories(CategoryLookupType.Name, [extractCategoryName(categoryName)]);
        return categories.length ? categories[0] : null;
    }*/

    async getCategoryBySlug(categorySlug: CategorySlugResolvable): Promise<Category | null> {
        const categories = await this._getCategories(CategoryLookupType.Slug, [extractCategorySlug(categorySlug)]);
        return categories.length ? categories[0] : null;
    }

    /*getCategoriesByIds(categoryIds: CategoryIdResolvable[]): Promise<Category[]> {
        return this._getCategories(CategoryLookupType.Id, categoryIds.map(extractCategoryId), true);
    }

    getCategoriesByNames(categoryNames: CategoryNameResolvable[]): Promise<Category[]> {
        return this._getCategories(CategoryLookupType.Name, categoryNames.map(extractCategoryName), true);
    }*/

    getCategoriesBySlugs(categorySlugs: CategorySlugResolvable[]): Promise<Category[]> {
        return this._getCategories(CategoryLookupType.Slug, categorySlugs.map(extractCategorySlug), true);
    }

    async _getCategories(lookupType: CategoryLookupType, param: string[], multi: boolean = false): Promise<Category[]> {
        if (param.length === 0) {
            return [];
        }
        const searchQuery = multi ? "categories" : `category(${lookupType}: "${param}")`;
        const result = await this._client.callApi<GlimeshPaginatedResponse<CategoryData>>({
            method: "POST",
            type: ApiCallType.Base,
            url: 'categories',
            body: `
            query {
               ${searchQuery} {
                id,
                name,
                parent {
                    id
                }
                slug,
                tagName
              }
            }`
        });
        
        if (result.data.categories && multi) {
            let allCategories = result.data.categories.map(categoryData => new Category(categoryData, this._client));
            let categories: Category[] = [];
            param.forEach(value => {
                categories = new Array(...categories, ...(allCategories.filter(category => category[lookupType] === value)));
            });
            return categories;
        } else if (result.data.category) {

            return [new Category(result.data.category, this._client)];

        } else {
            return [];
        }
    }
}