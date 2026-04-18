import Link from 'next/link';
import { Home, Leaf, SearchX } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-in fade-in duration-1000"></div>
      <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-tertiary-fixed-dim/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-in fade-in duration-1000 delay-500"></div>

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <div className="flex justify-center mb-8 relative">
           <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-[2.0] animate-pulse"></div>
           <SearchX className="h-28 w-28 text-primary relative z-10" strokeWidth={1} />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
          Page Not Found
        </h1>
        
        <p className="text-lg text-outline leading-relaxed max-w-sm mx-auto">
          We looked everywhere, but it seems this page has been pruned from our garden.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }), 
              "w-full sm:w-auto h-12 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:-translate-y-0.5"
            )}
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Link>
          
          <Link 
            href="/catalog"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto h-12 px-8 rounded-xl border-outline text-on-surface transition-all hover:bg-surface-variant hover:-translate-y-0.5"
            )}
          >
            <Leaf className="mr-2 h-5 w-5" />
            View Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
