import { Button } from "@/components/ui/button";

export default function RevenueChart() {
  return (
    <div className="relative rounded-xl bg-surface-container-low/40 p-8 border border-outline-variant/10">
      <div className="mb-10 flex items-end justify-between">
        <div className="space-y-1">
          <h4 className="text-xl font-black tracking-tight text-on-surface">Revenue Over Last 30 Days</h4>
          <p className="text-sm text-on-surface-variant font-medium">Consistent growth in premium planter sales.</p>
        </div>
        <div className="flex gap-2 p-1 bg-white/50 rounded-full border border-outline-variant/10 backdrop-blur-sm">
          <Button variant="ghost" className="rounded-full font-bold text-[10px] uppercase tracking-widest h-8 px-5 transition-all hover:bg-white shadow-none">Monthly</Button>
          <Button className="rounded-full shadow-sm font-bold text-[10px] uppercase tracking-widest bg-primary text-on-primary hover:bg-primary/90 h-8 px-5">Weekly</Button>
        </div>
      </div>
      
      {/* Simulated Chart Area */}
      <div className="flex h-64 items-end justify-between gap-3 px-2">
        <div className="relative w-full rounded-t-lg bg-primary/10 transition-all hover:bg-primary/20" style={{ height: "40%" }}></div>
        <div className="relative w-full rounded-t-lg bg-primary/20 transition-all hover:bg-primary/30" style={{ height: "55%" }}></div>
        <div className="relative w-full rounded-t-lg bg-primary/30 transition-all hover:bg-primary/40" style={{ height: "45%" }}></div>
        <div className="relative w-full rounded-t-lg bg-primary/40 transition-all hover:bg-primary/50" style={{ height: "70%" }}></div>
        <div className="relative w-full rounded-t-lg bg-primary/50 transition-all hover:bg-primary/60" style={{ height: "60%" }}></div>
        <div className="relative w-full rounded-t-lg bg-primary/60 transition-all hover:bg-primary/70" style={{ height: "85%" }}></div>
        <div className="relative w-full rounded-t-[12px] bg-primary shadow-[0_4px_12px_rgba(23,57,1,0.2)]" style={{ height: "100%" }}>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-on-surface px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#ebffe5] shadow-xl z-20">
            Peak: ₹45,200
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-on-surface"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between px-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
        <span>01 Oct</span>
        <span>08 Oct</span>
        <span>15 Oct</span>
        <span>22 Oct</span>
        <span>30 Oct</span>
      </div>
    </div>
  );
}
