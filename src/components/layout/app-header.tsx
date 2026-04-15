import { Search, Bell, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-surface-container-high/60 px-8 backdrop-blur-2xl border-b border-outline-variant/10">
      <div className="flex items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-2 text-primary hover:bg-primary-container/20 w-10 h-10 rounded-full" />
          <h2 className="text-lg font-black tracking-tight text-[#173901]">Dashboard</h2>
        </div>
        
        <div className="group relative hidden md:block">
          <span className="absolute inset-y-0 left-4 flex items-center text-on-surface-variant/50">
            <Search size={18} strokeWidth={2} />
          </span>
          <Input 
            type="text" 
            placeholder="Search data points..." 
            className="w-80 rounded-full border-none bg-white p-1.5 pl-12 pr-6 text-sm transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary-container/40 hover:bg-surface-container-low" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2.5 transition-all hover:bg-primary-container/20 hover:text-primary group">
          <Bell size={20} className="text-[#173901] transition-transform group-hover:rotate-12" strokeWidth={1.5} />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-error border-2 border-surface animate-pulse"></span>
        </button>
        
        <div className="ml-2 flex cursor-pointer items-center gap-3 rounded-full bg-white/50 p-1.5 pr-4 transition-all hover:bg-white hover:shadow-sm border border-outline-variant/5">
          <Avatar className="h-8 w-8 ring-1 ring-outline-variant/20">
            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAclTle-uX7qkzqPwP6Xy8w5SFhAXRxXOuYv6d_3txeHbV1bCNm80uF4tBJxTGGu1gadERkIAsAIsRf9uByH_JRA4EKIOFoueeYuWjeFgq-IZa5evWMj0dI4v0WVjYhhuasCMYuC-PspdWWakjKkofizR24XNI-5p8nG8H3HZSUB-i25NYOKTJOiTXSnZXSNXeVfYtGWY-oK8yoYXabrd89IqdJyzahmm69lA6wWIDBP9lrfTnE9ELr7RvdaWhP9CMFF3zzex0DIM5c" alt="Admin Avatar" />
            <AvatarFallback className="bg-primary-container text-on-primary font-black text-xs">A</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-xs font-black text-on-surface leading-none">Botanical Admin</p>
          </div>
          <ChevronDown size={14} className="text-on-surface-variant" strokeWidth={2} />
        </div>
      </div>
    </header>
  );
}
