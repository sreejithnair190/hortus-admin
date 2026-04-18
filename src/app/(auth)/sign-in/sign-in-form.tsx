"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Form, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signInThunk } from "@/store/slices/auth-slice";

// ── Validation Schema ────────────────────────────────────────────────
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const controlProps = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control } = controlProps;

  const onSubmit = async ({ data }: { data: SignInValues }) => {
    try {
      const result = await dispatch(signInThunk(data)).unwrap();
      toast.success("Welcome back!", {
        description: result.message || "Signed in successfully.",
      });
      router.push("/");
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <Form control={control} onSubmit={onSubmit} className="space-y-5">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-on-surface font-medium">
          Email Address
        </Label>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <div className="relative">
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!error}
                className="h-11 rounded-xl bg-surface-container-low/50 px-4 text-sm transition-all duration-200 placeholder:text-outline focus-visible:bg-surface-container-lowest focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
              />
              {error && (
                <p className="mt-2 text-xs text-error animate-in fade-in slide-in-from-top-1 duration-200">
                  {error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-on-surface font-medium">
          Password
        </Label>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <div className="relative">
              <Input
                {...field}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={!!error}
                className="h-11 rounded-xl bg-surface-container-low/50 px-4 pr-11 text-sm transition-all duration-200 placeholder:text-outline focus-visible:bg-surface-container-lowest focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors duration-200"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4.5 w-4.5" />
                ) : (
                  <Eye className="h-4.5 w-4.5" />
                )}
              </button>
              {error && (
                <p className="mt-2 text-xs text-error animate-in fade-in slide-in-from-top-1 duration-200">
                  {error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </span>
        )}
      </Button>
    </Form>
  );
}
