"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ChevronDown,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  UserCircle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-none shadow-[8px_0_24px_-4px_rgba(12,32,13,0.06)]">
      <SidebarHeader className="px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tighter text-[#ebffe5]">Hortus</h1>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-60 text-[#ebffe5]">Botanical Atelier</p>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={pathname === "/"} 
                  className={cn(
                    "data-[active=true]:bg-primary-container data-[active=true]:text-on-primary text-[#d6efd0] opacity-80 data-[active=true]:opacity-100 hover:bg-primary-container/50 transition-all py-6 h-auto rounded-md group-data-[collapsible=icon]:p-2",
                    pathname === "/" && "scale-95 transition-transform"
                  )}
                  render={
                    <Link href="/">
                      <LayoutDashboard size={20} strokeWidth={1.5} />
                      <span className="text-sm font-bold uppercase tracking-tight">Dashboard</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger render={
                    <SidebarMenuButton className="py-6 h-auto text-[#d6efd0] opacity-80 hover:bg-primary-container/30 hover:text-[#d6efd0] hover:opacity-100 flex justify-between rounded-md transition-all">
                      <div className="flex items-center gap-2">
                        <BookOpen size={20} strokeWidth={1.5} />
                        <span className="text-sm font-bold uppercase tracking-tight">Catalog</span>
                      </div>
                      <ChevronDown size={16} strokeWidth={2} className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  } />
                  <CollapsibleContent>
                    <SidebarMenuSub className="border-l-primary-container/30 mt-1 ml-6 space-y-1">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="py-2.5 h-auto text-[#d6efd0] opacity-70 hover:bg-primary-container/40 hover:text-[#d6efd0] hover:opacity-100 rounded-md"
                          render={<Link href="/catalog/products" className="text-[10px] font-bold uppercase tracking-widest pl-2">Products</Link>}
                        />
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="py-2.5 h-auto text-[#d6efd0] opacity-70 hover:bg-primary-container/40 hover:text-[#d6efd0] hover:opacity-100 rounded-md"
                          render={<Link href="/catalog/types" className="text-[10px] font-bold uppercase tracking-widest pl-2">Types</Link>}
                        />
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="py-2.5 h-auto text-[#d6efd0] opacity-70 hover:bg-primary-container/40 hover:text-[#d6efd0] hover:opacity-100 rounded-md"
                          render={<Link href="/catalog/seasons" className="text-[10px] font-bold uppercase tracking-widest pl-2">Seasons</Link>}
                        />
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="py-2.5 h-auto text-[#d6efd0] opacity-70 hover:bg-primary-container/40 hover:text-[#d6efd0] hover:opacity-100 rounded-md"
                          render={<Link href="/catalog/categories" className="text-[10px] font-bold uppercase tracking-widest pl-2">Categories</Link>}
                        />
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Orders */}
              <SidebarMenuItem>
                <SidebarMenuButton className="py-6 h-auto text-[#d6efd0] opacity-80 hover:bg-primary-container/30 hover:text-[#d6efd0] hover:opacity-100 rounded-md transition-all"
                  render={
                    <Link href="/orders">
                      <ShoppingCart size={20} strokeWidth={1.5} />
                      <span className="text-sm font-bold uppercase tracking-tight">Orders</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              {/* Customers */}
              <SidebarMenuItem>
                <SidebarMenuButton className="py-6 h-auto text-[#d6efd0] opacity-80 hover:bg-primary-container/30 hover:text-[#d6efd0] hover:opacity-100 rounded-md transition-all"
                  render={
                    <Link href="/customers">
                      <Users size={20} strokeWidth={1.5} />
                      <span className="text-sm font-bold uppercase tracking-tight">Customers</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              {/* Analytics */}
              <SidebarMenuItem>
                <SidebarMenuButton className="py-6 h-auto text-[#d6efd0] opacity-80 hover:bg-primary-container/30 hover:text-[#d6efd0] hover:opacity-100 rounded-md transition-all"
                  render={
                    <Link href="/analytics">
                      <BarChart3 size={20} strokeWidth={1.5} />
                      <span className="text-sm font-bold uppercase tracking-tight">Analytics</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton className="py-6 h-auto text-[#d6efd0] opacity-80 hover:bg-primary-container/30 hover:text-[#d6efd0] hover:opacity-100 rounded-md transition-all"
                  render={
                    <Link href="/settings">
                      <Settings size={20} strokeWidth={1.5} />
                      <span className="text-sm font-bold uppercase tracking-tight">Settings</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#2D5016]/30 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="py-6 h-auto text-[#d6efd0] opacity-80 hover:bg-primary-container/30 hover:text-[#d6efd0] hover:opacity-100 rounded-md transition-all"
              render={
                <Link href="/profile">
                  <UserCircle size={20} strokeWidth={1.5} />
                  <span className="text-sm font-bold uppercase tracking-tight">Admin Profile</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
