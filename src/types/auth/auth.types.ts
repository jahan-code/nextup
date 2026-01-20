export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export interface AuthError {
  error: string;
  details?: unknown;
  message?: string;
}

