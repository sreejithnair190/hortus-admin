import { OrderData } from "@/services/dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

export default function RecentOrders({ orders }: { orders: OrderData[] }) {
  if (!orders) return null;
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_-4px_rgba(12,32,13,0.04)] border border-outline-variant/10">
      <div className="flex items-center justify-between bg-surface-container-low/30 p-6 border-b border-outline-variant/10">
        <h4 className="text-lg font-bold tracking-tight text-on-surface">Recent Orders</h4>
        <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4">View All Records</button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/10">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/60 px-6 h-14">Order ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/60 px-6 h-14">Customer</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/60 px-6 h-14">Items</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/60 px-6 h-14">Total</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/60 px-6 h-14">Status</TableHead>
              <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/60 px-6 h-14">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant/5">
            {orders.map((order) => (
              <TableRow key={order.id} className="transition-all border-none hover:bg-surface-container-low/20">
                <TableCell className="text-sm font-medium px-6 py-5 text-on-surface/80">{order.id}</TableCell>
                <TableCell className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${order.avatarColor} ring-1 ring-white shadow-sm`}>
                      {order.customerInitials}
                    </div>
                    <span className="text-sm font-bold text-on-surface">{order.customerName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-on-surface-variant px-6 py-5">{order.items}</TableCell>
                <TableCell className="text-sm font-black text-on-surface px-6 py-5">{order.total}</TableCell>
                <TableCell className="px-6 py-5">
                  <Badge variant={order.status === "Paid" ? "default" : "secondary"} className={`text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full border-none shadow-none ${order.status === 'Paid' ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-surface-variant text-on-surface-variant'}`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6 py-5">
                  <button className="h-8 w-8 rounded-full flex items-center justify-center text-on-surface-variant transition-all hover:bg-primary/10 hover:text-primary">
                    <Eye size={18} strokeWidth={1.5} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
