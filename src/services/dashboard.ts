"use server";

export type KPIData = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  colorClass: string;
};

export type OrderData = {
  id: string;
  customerName: string;
  customerInitials: string;
  avatarColor: string;
  items: string;
  total: string;
  status: "Paid" | "Pending";
};

export type AlertData = {
  id: string;
  productName: string;
  leftCount: number;
  imageUrl: string;
  imageAlt: string;
};

export type TopSellingData = {
  id: string;
  productName: string;
  units: number;
  progressPercentage: number;
  colorClass: string;
};

export type DashboardData = {
  kpis: KPIData[];
  recentOrders: OrderData[];
  alerts: AlertData[];
  topSelling: TopSellingData[];
  inventoryHealth: number;
};

export async function fetchDashboardData(): Promise<DashboardData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    kpis: [
      { title: "Total Revenue", value: "₹12,45,000", change: "+12.5%", isPositive: true, icon: "payments", colorClass: "text-primary bg-primary-fixed" },
      { title: "Orders Today", value: "124", change: "-2.4%", isPositive: false, icon: "local_shipping", colorClass: "text-secondary bg-secondary-container" },
      { title: "Active Products", value: "1,240", change: "+5.1%", isPositive: true, icon: "potted_plant", colorClass: "text-on-surface bg-surface-variant" },
      { title: "Registered Users", value: "8,500", change: "+18.2%", isPositive: true, icon: "person_add", colorClass: "text-tertiary bg-tertiary-fixed" },
    ],
    recentOrders: [
      { id: "#HT-9012", customerName: "Arjun Sharma", customerInitials: "AS", avatarColor: "bg-secondary-container", items: "2 Plants, 1 Pot", total: "₹3,450", status: "Paid" },
      { id: "#HT-9011", customerName: "Priya Kapoor", customerInitials: "PK", avatarColor: "bg-tertiary-fixed", items: "1 Terrarium", total: "₹12,800", status: "Pending" },
      { id: "#HT-9010", customerName: "Mohit Kumar", customerInitials: "MK", avatarColor: "bg-primary-fixed", items: "5 Ferns", total: "₹2,100", status: "Paid" },
    ],
    alerts: [
      { id: "1", productName: "Fiddle Leaf Fig", leftCount: 2, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpxvgEtzhBEWW0nqxgIhfBUCKSyFcmMJwID96mavqnd6WnVpcNsyfeVgac8l-Qr5zkYIrFnlCPffwKda_b5qCCip99gyrUyDR3-rL1OGi_GXsZwqG1wVE87lyMGUQ0PLHlIqZNf0VZMPY2ka-ZJ9y3I-qRWMwWMzambDyqVMRNsAx9dB0K1h5Z1TG9Gtfy19e_CTilx794hFSPEyJYKtF6Zlxha2FKPTvshdYwl7Mf4xSDsaGjHS9idgOV2Xap4qchgPXEz3dKd17K", imageAlt: "Fiddle Leaf" },
      { id: "2", productName: "Monstera Albo", leftCount: 1, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4i0WIjbWt6N7YMpuausqJ9vfwwZ_Gc35Ilyfu2b86g998eLdevE3WS6dZE6w4Fh7LwzaAH8o3X1hzGXNUgLh9tRYwcJVZgUvg-J-X1ynCwPHhU0EL0jhX_au1-ICdft067JnKnagNzpxJib1CbdOlbuXfjJ7OXQvjx7j1PNlCfTktLDDHt2k96m0kYcVTLXPRNgTH-_r7uvx_nNjX3SvupLEePJGVm66e65zbXNQolW6uuWdtQG-36xnz3ZG4mziwOj80MwofHwG_", imageAlt: "Monstera" },
      { id: "3", productName: "Snake Plant", leftCount: 4, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWaHSr4T6yftUTUmr5FAOU1KX690CmRT3uZrnz7lb9gh0EYHqLP0vczei3WcANY_7RZeSNH3JVAilDXQIrOifd-Q8vldoFAqVTCCNf1DcUSIIulMC_dELp7xQaHQTCpDha4QxaIuCdNdcIS0ylmkxRk0yfQ4xTHmuRPuW25pSyqlWuZur9PiRGDcf8y47MUCYqBkcIrrJdNDKEo0LEZXb_fpVeb9Mot4NPKwrQEbon-US5xKmEikCh5V5pJM0O4q-HSih2aly1Fkbh", imageAlt: "Snake Plant" },
    ],
    topSelling: [
      { id: "1", productName: "Calathea Ornata", units: 780, progressPercentage: 85, colorClass: "bg-primary-fixed" },
      { id: "2", productName: "Ceramic Mist Sprayer", units: 620, progressPercentage: 70, colorClass: "bg-secondary-container" },
      { id: "3", productName: "Organic Potting Mix", units: 450, progressPercentage: 55, colorClass: "bg-surface-variant" },
      { id: "4", productName: "Olive Tree (Large)", units: 310, progressPercentage: 40, colorClass: "bg-tertiary-fixed-dim" },
    ],
    inventoryHealth: 94,
  };
}
