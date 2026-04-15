import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardData } from "@/services/dashboard";

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
}

const initialState: DashboardState = {
  data: null,
  loading: true,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardData>) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
