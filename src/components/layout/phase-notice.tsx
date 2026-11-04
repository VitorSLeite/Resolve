import { ArrowLeft, Construction } from "lucide-react";
import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function PhaseNotice({
  title,
  description,
  phase,
  children,
}: {
  title: string;
  description: string;
  phase: string;
  children?: ReactNode;
}) {
  return (
    <Container className="max-w-xl py-20 sm:py-28">
      <div className="animate-fade-up rounded-2xl border bg-card p-8 shadow-xl shadow-black/[0.03]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
          <Construction className="h-3.5 w-3.5" />
          Disponível na {phase}
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        {children}
        <LinkButton href="/" variant="outline" className="mt-8">
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </LinkButton>
      </div>
    </Container>
  );
}
