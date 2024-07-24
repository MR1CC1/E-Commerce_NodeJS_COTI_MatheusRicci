export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean; 
    createdAt: Date;  
}

export type UserUpdate = Partial<UserInterface>