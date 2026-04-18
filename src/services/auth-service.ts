import api from "@/lib/axios";
import { AUTH_ROUTE, USER_ROUTE } from "@/lib/constants";

export type SignInPayload = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type SignInResponse = {
  data: AuthTokens;
  message: string;
  timestamp: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

export type CurrentUserResponse = {
  data: User;
  message: string;
  timestamp: string;
};

class AuthService {
  signIn = (payload: SignInPayload): Promise<SignInResponse> =>
    api.post<SignInResponse>(`${AUTH_ROUTE}/sign-in`, payload).then((r) => r.data);

  refresh = (): Promise<SignInResponse> =>
    api.post<SignInResponse>(`${AUTH_ROUTE}/refresh`).then((r) => r.data);

  getCurrentUser = (): Promise<CurrentUserResponse> =>
    api.get<CurrentUserResponse>(`${USER_ROUTE}/me`).then((r) => r.data);
}

export const authService = new AuthService();