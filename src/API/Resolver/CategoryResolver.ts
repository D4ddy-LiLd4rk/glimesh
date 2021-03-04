export interface CategoryIdResolvableType {
	id: string;
}

export interface CategoryNameResolvableType {
	name: string;
}

export interface CategorySlugResolvableType {
	slug: string;
}

export type CategoryIdResolvable = string | number | CategoryIdResolvableType;

export type CategoryNameResolvable = string | CategoryNameResolvableType;

export type CategorySlugResolvable = string | CategorySlugResolvableType;

export function extractCategoryId(category: CategoryIdResolvable): string {
	if (typeof category === 'string') {
		return category;
	} else if (typeof category === 'number') {
		return category.toString(10);
	} else {
		return category.id;
	}
}

export function extractCategoryName(category: CategoryNameResolvable): string {
	return typeof category === 'string' ? category : category.name;
}

export function extractCategorySlug(category: CategorySlugResolvable): string {
	return typeof category === 'string' ? category : category.slug;
}