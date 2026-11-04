"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled || open ? "border-border bg-background/80 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LinkButton href="/entrar" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Entrar
          </LinkButton>
          <LinkButton href="/cadastro" size="sm" className="hidden sm:inline-flex">
            Criar conta
          </LinkButton>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Menu móvel" className="animate-fade-in border-t md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <LinkButton href="/entrar" variant="outline" onClick={() => setOpen(false)}>
                Entrar
              </LinkButton>
              <LinkButton href="/cadastro" onClick={() => setOpen(false)}>
                Criar conta
              </LinkButton>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
