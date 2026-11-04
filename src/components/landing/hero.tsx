"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight, Paperclip, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PROBLEM_SUGGESTIONS } from "@/config/site";
import { saveProblemDraft, PROBLEM_DRAFT_MAX } from "@/features/problems/draft";

export function Hero() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const value = text.trim();
    if (value.length < 10) {
      setError("Descreva um pouco mais a sua situação (mínimo de 10 caracteres).");
      return;
    }
    setPending(true);
    saveProblemDraft(value);
    router.push("/comecar");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
  }

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <Container className="relative pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Planos de ação, não respostas genéricas
          </div>
          <h1 className="animate-fade-up mt-6 text-4xl font-semibold tracking-tight text-balance [animation-delay:60ms] sm:text-6xl">
            Qual problema você precisa resolver hoje?
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground [animation-delay:120ms] sm:text-lg">
            Descreva a situação com suas palavras. O Resolve AI entende o contexto, pergunta só o necessário e monta um
            plano passo a passo para você acompanhar até o fim.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="animate-fade-up mx-auto mt-10 max-w-2xl [animation-delay:180ms]"
          aria-label="Descrever problema"
        >
          <div className="rounded-2xl border bg-card p-2 shadow-xl shadow-black/[0.04] transition-shadow focus-within:border-primary/50 focus-within:shadow-primary/10 dark:shadow-black/30">
            <label htmlFor="problem" className="sr-only">
              Descreva seu problema
            </label>
            <textarea
              id="problem"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={onKeyDown}
              maxLength={PROBLEM_DRAFT_MAX}
              rows={4}
              placeholder="Ex.: Comprei uma geladeira há 20 dias, ela parou de gelar e a loja diz que só o fabricante pode resolver…"
              className="block w-full resize-none bg-transparent px-3 py-2.5 text-base leading-relaxed outline-none placeholder:text-muted-foreground/70"
              aria-invalid={!!error}
              aria-describedby={error ? "problem-error" : undefined}
            />
            <div className="flex items-center justify-between gap-2 px-1 pt-1">
              <span
                className="inline-flex items-center gap-1.5 px-2 text-xs text-muted-foreground"
                title="O envio de documentos será liberado na Fase 5"
              >
                <Paperclip className="h-3.5 w-3.5" />
                Anexos em breve
              </span>
              <Button type="submit" disabled={pending} className="group">
                {pending ? "Preparando…" : "Resolver meu problema"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
          {error && (
            <p id="problem-error" role="alert" className="mt-2 px-1 text-sm text-danger">
              {error}
            </p>
          )}
        </form>

        <div className="animate-fade-up mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2 [animation-delay:240ms]">
          {PROBLEM_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setText(s);
                setError(null);
                document.getElementById("problem")?.focus();
              }}
              className="rounded-full border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
