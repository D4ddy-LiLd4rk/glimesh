import BaseAPI from "../BaseAPI";
import { Category } from "./Category";

export class CategoryAPI extends BaseAPI {
    /*getCategoryById(categoryId: number): Promise<Category | null> {
        return new Category(categoryId, this._client).init();
    };
    
    getCategoryByName(categoryName: string): Promise<Category | null> {
        return new Category(categoryName, this._client).init();
    };*/

    getCategoryBySlug(categorySlug: string): Promise<Category | null> {
        return new Category(categorySlug, this._client).init();
    };
}