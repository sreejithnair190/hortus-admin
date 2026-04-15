import { fetchDashboardData } from "@/services/dashboard";
import DashboardClient from "@/components/dashboard/dashboard-client";

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  return (
    <DashboardClient initialData={data} />
  );
}
