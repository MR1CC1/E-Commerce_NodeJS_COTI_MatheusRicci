export interface CategoryInterface {
    id: number;
    name: string;
}

export type CategoryUpdate = Partial<CategoryInterface>;
