"use client";

import { ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/auth-slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export function UserNav() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // Handle hydration mismatch safely
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/sign-in");
  };

  if (!mounted) {
    return (
      <div className="ml-2 flex cursor-pointer items-center gap-3 rounded-full bg-white/50 p-1.5 pr-4 border border-outline-variant/5">
        <Avatar className="h-8 w-8 ring-1 ring-outline-variant/20">
          <AvatarFallback className="bg-primary-container text-on-primary font-black text-xs">...</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  const name = user?.name || "Botanical Admin";
  const email = user?.email || "admin@hortus.com";
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-2 flex cursor-pointer focus:outline-none items-center gap-3 rounded-full bg-white/50 p-1.5 pr-4 transition-all hover:bg-white hover:shadow-sm border border-outline-variant/5 focus-visible:ring-2 focus-visible:ring-primary-container/40">
        <Avatar className="h-8 w-8 ring-1 ring-outline-variant/20">
          <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAclTle-uX7qkzqPwP6Xy8w5SFhAXRxXOuYv6d_3txeHbV1bCNm80uF4tBJxTGGu1gadERkIAsAIsRf9uByH_JRA4EKIOFoueeYuWjeFgq-IZa5evWMj0dI4v0WVjYhhuasCMYuC-PspdWWakjKkofizR24XNI-5p8nG8H3HZSUB-i25NYOKTJOiTXSnZXSNXeVfYtGWY-oK8yoYXabrd89IqdJyzahmm69lA6wWIDBP9lrfTnE9ELr7RvdaWhP9CMFF3zzex0DIM5c" alt={name} />
          <AvatarFallback className="bg-primary-container text-on-primary font-black text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="hidden lg:block text-left">
          <p className="text-xs font-black text-on-surface leading-none block">{name}</p>
        </div>
        <ChevronDown size={14} className="text-on-surface-variant flex-shrink-0" strokeWidth={2} />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-on-surface">{name}</p>
              <p className="text-xs leading-none text-on-surface-variant/70">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer text-on-surface hover:bg-surface-container-low transition-colors duration-150 flex items-center w-full">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer text-on-surface hover:bg-surface-container-low transition-colors duration-150 flex items-center w-full">
             <Settings className="mr-2 h-4 w-4" />
             <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-error hover:bg-error/10 hover:text-error transition-colors duration-150">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
