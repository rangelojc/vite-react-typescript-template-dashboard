export interface LoginRequest {
  id: string;
  password: string;
}

export interface LoginResponse {
  errorMessage?: string;
  memberName?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface RefreshResponse {
  accessToken: string;
}
