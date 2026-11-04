import { ClipboardList, MessageSquareText, Route, Target } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Descreva",
    text: "Conte o que aconteceu do seu jeito. Se quiser, anexe notas fiscais, contratos ou prints.",
  },
  {
    icon: Target,
    title: "Esclareça",
    text: "A IA identifica a categoria e pergunta apenas o que falta — datas, valores, protocolos.",
  },
  {
    icon: Route,
    title: "Receba o plano",
    text: "Passos em ordem lógica, documentos necessários, obstáculos prováveis e a próxima ação.",
  },
  {
    icon: ClipboardList,
    title: "Acompanhe",
    text: "Marque o progresso, registre protocolos e prazos. O plano se adapta a cada novidade.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Uma metodologia de resolução, não um chat genérico"
          description="Cada conversa segue um processo estruturado: entender, esclarecer, planejar e acompanhar."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <step.icon className="h-4.5 w-4.5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
