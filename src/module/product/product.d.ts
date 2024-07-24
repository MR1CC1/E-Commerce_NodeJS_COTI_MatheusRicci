export interface ProductInterface {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryId: number;
}

export type ProductUpdate = Partial<ProductInterface>;
