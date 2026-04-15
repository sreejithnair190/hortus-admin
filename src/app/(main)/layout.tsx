import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/app-header";
import StoreProvider from "@/store/store-provider";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full min-h-screen flex flex-col bg-surface text-on-surface">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </StoreProvider>
  );
}