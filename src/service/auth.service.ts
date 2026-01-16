import type { LoginRequest, SignupRequest, AuthResponse, User } from "../types/auth.type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const rawRes = await response.json();
  return rawRes.data as AuthResponse;
}

export async function signup(request: SignupRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Signup failed");
  }
  const rawRes = await response.json();
  return rawRes.data as AuthResponse;
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_URL}/auth/check-auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  const rawRes = await response.json();
  return rawRes.data.user as User;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return;
}