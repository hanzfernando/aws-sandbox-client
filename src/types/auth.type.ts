export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile_pic_url?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}