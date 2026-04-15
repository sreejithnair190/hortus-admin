import { KPIData } from "@/services/dashboard";
import { 
  Wallet, 
  Truck, 
  Sprout, 
  UserPlus, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  payments: Wallet,
  local_shipping: Truck,
  potted_plant: Sprout,
  person_add: UserPlus,
};

export default function KPIGrid({ kpis }: { kpis: KPIData[] }) {
  if (!kpis) return null;
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, idx) => {
        const Icon = IconMap[kpi.icon] || Wallet;
        return (
          <div key={idx} className="relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_8px_24px_-4px_rgba(12,32,13,0.04)] border border-outline-variant/5">
            <div className="mb-4 flex items-start justify-between">
              <div className={`rounded-xl p-3 transition-colors ${kpi.colorClass}`}>
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${kpi.isPositive ? 'text-primary' : 'text-error'}`}>
                {kpi.isPositive ? (
                  <TrendingUp size={14} strokeWidth={2.5} />
                ) : (
                  <TrendingDown size={14} strokeWidth={2.5} />
                )}
                <span>{kpi.change}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/70">{kpi.title}</p>
              <h3 className="text-2xl font-black text-on-surface tracking-tight">{kpi.value}</h3>
            </div>
          </div>
        );
      })}
    </section>
  );
}
