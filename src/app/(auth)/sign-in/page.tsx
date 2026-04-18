import { Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SignInForm from "./sign-in-form";

// ── Sign In Page ─────────────────────────────────────────────────────
export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      {/* ── Brand Header ── */}
      <div className="mb-8 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-primary-fixed/40 blur-lg" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-container shadow-lg shadow-primary/20">
            <Leaf className="h-8 w-8 text-on-primary-container" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">
            Hortus Atelier
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Admin Dashboard — Sign in to continue
          </p>
        </div>
      </div>

      {/* ── Sign In Card ── */}
      <Card className="w-full max-w-[420px] border-0 bg-surface-container-lowest/80 shadow-xl shadow-primary/5 backdrop-blur-xl ring-1 ring-outline-variant/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <CardContent className="pt-6">
          <SignInForm />

          {/* ── Divider ── */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/40" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-container-lowest/80 px-3 text-on-surface-variant">
                Hortus Botanical Atelier © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subtle floating badge */}
      <div className="mt-6 animate-in fade-in duration-1000 delay-500">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high/60 px-3 py-1.5 text-xs text-on-surface-variant backdrop-blur-sm ring-1 ring-outline-variant/30">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Secure admin access
        </span>
      </div>
    </div>
  );
}
