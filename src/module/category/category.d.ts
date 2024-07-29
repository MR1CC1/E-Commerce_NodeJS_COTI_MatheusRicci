export interface CategoryBase {
    name: string;
  }
  
  export interface CategoryStore extends CategoryBase {}
  
  export type CategoryUpdate = Partial<CategoryStore>;
  
  export interface Category {
    id: number;
    name: string;
  }
  