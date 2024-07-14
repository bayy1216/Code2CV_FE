export interface OAuthLoginRequest {
  code: string;
  state: string;
}

export interface EmailLoginRequest {
  email: string;
  password: string;
}