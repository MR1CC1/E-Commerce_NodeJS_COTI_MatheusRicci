export interface AuthInterface {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        isAdmin: boolean;
    };
    token: string;
}
