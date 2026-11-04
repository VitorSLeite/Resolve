import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-center text-background sm:px-12">
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
          <h2 className="relative text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Pare de adiar aquele problema.
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-background/70">
            Comece descrevendo a situação. Em poucos minutos você terá um caminho claro para seguir.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/#top" size="lg" className="bg-background text-foreground hover:bg-background/90">
              Descrever meu problema <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/cadastro" size="lg" variant="ghost" className="text-background/80 hover:bg-background/10 hover:text-background">
              Criar conta gratuita
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
