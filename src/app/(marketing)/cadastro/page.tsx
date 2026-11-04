import type { Metadata } from "next";
import { PhaseNotice } from "@/components/layout/phase-notice";

export const metadata: Metadata = { title: "Criar conta" };

export default function SignUpPage() {
  return (
    <PhaseNotice
      phase="Fase 2"
      title="Criar sua conta"
      description="O cadastro com aceite de termos e política de privacidade será liberado na Fase 2. Seus problemas, planos e documentos ficarão vinculados exclusivamente à sua conta."
    />
  );
}
