import { FileSignature, FolderSearch, History, ListTodo, Scale, Zap } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";

const BENEFITS = [
  { icon: Zap, title: "Clareza imediata", text: "Saiba por onde começar em minutos, mesmo sem entender o assunto." },
  { icon: ListTodo, title: "Plano acompanhável", text: "Passos com status, checklist, prazos e notas — tudo em um só lugar." },
  { icon: FileSignature, title: "Textos prontos para editar", text: "E-mails, reclamações e requerimentos gerados a partir do seu caso." },
  { icon: FolderSearch, title: "Leitura de documentos", text: "Datas, valores e prazos extraídos de PDFs e fotos, confirmados por você." },
  { icon: History, title: "Contexto preservado", text: "Volte dias depois e continue exatamente de onde parou." },
  { icon: Scale, title: "Honestidade sobre limites", text: "A IA diz quando não sabe e indica quando procurar um profissional." },
];

export function Benefits() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Benefícios"
          title="Menos tempo perdido, mais problemas resolvidos"
          description="Pensado para quem precisa resolver algo prático e não sabe qual é o próximo passo."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <b.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
