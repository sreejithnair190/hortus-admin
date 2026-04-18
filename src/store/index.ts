import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboard-slice";
import productsReducer from "./slices/products-slice";
import authReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
