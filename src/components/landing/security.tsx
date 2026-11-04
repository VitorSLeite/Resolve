import { EyeOff, HandMetal, KeyRound, ShieldCheck } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";

const ITEMS = [
  { icon: ShieldCheck, title: "Seus dados são só seus", text: "Isolamento por usuário no banco de dados — ninguém mais acessa seus problemas ou documentos." },
  { icon: HandMetal, title: "Nada é feito sem você", text: "A IA sugere; você decide. Nenhum e-mail, envio ou contato externo acontece automaticamente." },
  { icon: EyeOff, title: "Sem treino com seus dados", text: "Suas informações não são usadas para treinar modelos sem consentimento explícito." },
  { icon: KeyRound, title: "Exclusão a qualquer momento", text: "Apague um problema, um documento ou toda a sua conta quando quiser." },
];

export function Security() {
  return (
    <section id="seguranca" className="scroll-mt-20 border-t bg-muted/40 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          eyebrow="Confiança e privacidade"
          title="Construído para lidar com informações sensíveis"
          description="Em temas jurídicos, médicos ou financeiros, o Resolve AI explica limites com cautela e indica quando procurar um profissional qualificado."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {ITEMS.map((i) => (
            <div key={i.title}>
              <i.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{i.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
