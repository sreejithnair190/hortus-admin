import { AlertData, TopSellingData } from "@/services/dashboard";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function AlertsAndProducts({ alerts, topSelling, healthScore }: { alerts: AlertData[], topSelling: TopSellingData[], healthScore: number }) {
  return (
    <div className="space-y-6">
      {/* Low Stock Alerts */}
      <div className="rounded-xl bg-white p-6 shadow-[0_8px_24px_-4px_rgba(12,32,13,0.04)] border border-outline-variant/10">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-error/10 p-2 rounded-lg text-error">
            <TriangleAlert size={20} strokeWidth={2} />
          </div>
          <h4 className="text-lg font-black tracking-tight text-on-surface">Low Stock Alerts</h4>
        </div>
        <div className="space-y-4">
          {alerts?.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between rounded-xl bg-surface-container-low/40 p-4 border border-outline-variant/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-lg shadow-sm">
                  <img src={alert.imageUrl} alt={alert.imageAlt} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black text-on-surface">{alert.productName}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-error mt-0.5">Only {alert.leftCount} Left</p>
                </div>
              </div>
              <Button size="sm" className="h-8 rounded-full px-4 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 bg-primary text-on-primary">
                Restock
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="rounded-xl bg-[#1A2E1A] p-7 text-[#ffffff] shadow-[0_12px_32px_-4px_rgba(12,32,13,0.2)] border border-white/5">
        <h4 className="mb-10 text-lg font-black tracking-tight">Top Selling Products</h4>
        <div className="space-y-8">
          {topSelling?.map((product) => (
            <div key={product.id} className="space-y-3">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.15em] opacity-50">
                <span>{product.productName}</span>
                <span>{product.units} Units</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 p-[1px]">
                <div className={`h-full rounded-full ${product.colorClass} shadow-[0_0_12px_rgba(255,255,255,0.05)]`} style={{ width: `${product.progressPercentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center bg-gradient-to-b from-transparent to-white/5 -mx-7 -mb-7 rounded-b-xl pb-8">
          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 mb-2">Inventory Health Score</p>
          <div className="relative inline-block">
            <h5 className="text-5xl font-black text-[#ebffe5] relative z-10">{healthScore}%</h5>
            <div className="absolute -inset-4 bg-[#ebffe5]/10 blur-2xl rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
