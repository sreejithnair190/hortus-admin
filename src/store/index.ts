import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboard-slice";
import productsReducer from "./slices/products-slice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
