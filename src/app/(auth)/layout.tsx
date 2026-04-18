import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Hortus Botanical Atelier",
  description: "Sign in to your Hortus Admin account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-fixed/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-tertiary-fixed/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-secondary-container/25 blur-[100px]" />

      {/* Leaf pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C20 15, 10 25, 15 40 C20 50, 30 55, 30 55 C30 55, 40 50, 45 40 C50 25, 40 15, 30 5Z' fill='%23173901' /%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
