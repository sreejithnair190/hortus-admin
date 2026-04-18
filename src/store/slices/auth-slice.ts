import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authService,
  type SignInPayload,
  type AuthTokens,
  type User,
} from "@/services/auth-service";

interface AuthState {
  tokens: AuthTokens | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  tokens: null,
  user: null,
  loading: false,
  error: null,
};

export const signInThunk = createAsyncThunk(
  "auth/signIn",
  async (payload: SignInPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.signIn(payload);
      // Persist accessToken for future API calls
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.accessToken);
        
        // Securely store the refresh token in an HttpOnly cookie via Next.js backend
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: response.data.refreshToken }),
        });
      }
      // After sign-in, immediately fetch the current user profile
      dispatch(getCurrentUserThunk());
      return response;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string }; status?: number };
        };
        return rejectWithValue(
          axiosError.response?.data?.message || "Sign in failed"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string }; status?: number };
        };
        return rejectWithValue(
          axiosError.response?.data?.message || "Failed to load user"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.tokens = null;
      state.user = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        // Clear the HttpOnly session cookie
        fetch('/api/auth/session', { method: 'DELETE' }).catch(() => {});
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload.data;
        state.error = null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrentUserThunk.pending, (state) => {})
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        // If current user fetch fails (e.g. 401 unrefreshable), it will be handled by axios interceptors
        state.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
