import type { Metadata } from "next";
import { PhaseNotice } from "@/components/layout/phase-notice";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <PhaseNotice
      phase="Fase 2"
      title="Entrar no Resolve AI"
      description="O login seguro (com sessões protegidas e isolamento de dados por usuário) será implementado na próxima fase, após a escolha do provedor de autenticação."
    />
  );
}
