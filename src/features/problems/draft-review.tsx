"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check, Info, Trash2 } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { clearProblemDraft, PROBLEM_DRAFT_MAX, readProblemDraft, saveProblemDraft } from "./draft";

export function DraftReview() {
  const [text, setText] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // sessionStorage is only available after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(readProblemDraft());
  }, []);

  if (text === null) {
    return (
      <Container className="max-w-2xl py-20">
        <div className="h-64 animate-pulse rounded-2xl bg-muted" aria-label="Carregando" />
      </Container>
    );
  }

  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <div className="animate-fade-up">
        <p className="text-sm font-medium text-primary">Seu problema</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Revise a descrição</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O texto fica salvo apenas neste navegador, nesta sessão. Nada foi enviado para servidores ou para a IA.
        </p>

        <div className="mt-8 rounded-2xl border bg-card p-2">
          <label htmlFor="draft" className="sr-only">
            Descrição do problema
          </label>
          <textarea
            id="draft"
            value={text}
            maxLength={PROBLEM_DRAFT_MAX}
            onChange={(e) => {
              setText(e.target.value);
              setSaved(false);
            }}
            rows={7}
            placeholder="Nenhuma descrição salva ainda. Escreva aqui o que está acontecendo."
            className="block w-full resize-y bg-transparent px-3 py-2.5 text-base leading-relaxed outline-none placeholder:text-muted-foreground/70"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
            <span className="px-2 text-xs text-muted-foreground">
              {text.length}/{PROBLEM_DRAFT_MAX}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  clearProblemDraft();
                  setText("");
                  setSaved(false);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Descartar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  saveProblemDraft(text);
                  setSaved(true);
                }}
              >
                {saved ? <Check className="h-3.5 w-3.5 text-success" /> : null}
                {saved ? "Salvo" : "Salvar rascunho"}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3 rounded-xl border border-primary/25 bg-accent/40 p-4 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
          <div>
            <p className="font-medium">O assistente de IA chega na Fase 3</p>
            <p className="mt-1 text-muted-foreground">
              Depois que contas (Fase 2) e a integração de IA (Fase 3) forem ativadas, este rascunho será usado para
              classificar a categoria, fazer perguntas de esclarecimento e gerar seu plano de ação.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/" variant="outline">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </LinkButton>
          <LinkButton href="/cadastro">Criar conta para continuar</LinkButton>
        </div>
      </div>
    </Container>
  );
}
