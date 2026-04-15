"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData } from "@/store/slices/dashboard-slice";
import { RootState } from "@/store/index";
import { DashboardData } from "@/services/dashboard";

import KPIGrid from "./kpi-grid";
import RevenueChart from "./revenue-chart";
import RecentOrders from "./recent-orders";
import AlertsAndProducts from "./alerts-and-products";

export default function DashboardClient({ initialData }: { initialData: DashboardData }) {
  const dispatch = useDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    if (initialData) {
      dispatch(setDashboardData(initialData));
    }
  }, [initialData, dispatch]);

  const data = dashboardState.data || initialData;

  if (!data) return null;

  return (
    <div className="space-y-8 p-8">
      <KPIGrid kpis={data.kpis} />
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <RevenueChart />
          <RecentOrders orders={data.recentOrders} />
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <AlertsAndProducts alerts={data.alerts} topSelling={data.topSelling} healthScore={data.inventoryHealth} />
        </div>
      </div>
    </div>
  );
}
