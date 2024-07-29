export interface ProductBase {
    name: string;
    price: number;
    quantity: number;
    categoryId: number;
  }
  
  export interface ProductStore extends ProductBase {}
  
  export type ProductUpdate = Partial<ProductStore>;
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryId: number;
  }
  