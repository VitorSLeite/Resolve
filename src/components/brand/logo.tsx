import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M10 21.5V10.5h6.2a3.8 3.8 0 0 1 0 7.6H10m6 0 4.5 3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-foreground"
      />
      <circle cx="23" cy="10" r="2" className="fill-primary-foreground" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)} aria-label="Resolve AI — início">
      <LogoMark />
      <span className="text-[17px]">
        Resolve<span className="text-primary"> AI</span>
      </span>
    </Link>
  );
}
