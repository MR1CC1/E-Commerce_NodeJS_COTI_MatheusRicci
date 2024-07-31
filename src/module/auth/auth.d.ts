export interface AuthParams {
  email: string
  password: string
}

export type AuthUser = {
  id: number
  email: string
}

export interface AuthResponse {
  token: string,
  user: AuthUser
}

export interface RegisterParams extends AuthParams { }