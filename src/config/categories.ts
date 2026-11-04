import {
  Briefcase,
  CircleHelp,
  CreditCard,
  FileText,
  FolderOpen,
  Landmark,
  ListChecks,
  Megaphone,
  Plane,
  RotateCcw,
  ShoppingBag,
  Laptop,
  XCircle,
  type LucideIcon,
} from "lucide-react";

/**
 * Extensible category registry. To add a new area, append an entry here —
 * the database stores `slug` as text and validates against this list.
 */
export type ProblemCategory = {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const PROBLEM_CATEGORIES = [
  { slug: "consumo", label: "Compras e consumo", description: "Produtos com defeito, entregas e lojas", icon: ShoppingBag },
  { slug: "garantia-troca", label: "Garantias e trocas", description: "Devoluções, arrependimento e garantia", icon: RotateCcw },
  { slug: "cobrancas", label: "Cobranças indevidas", description: "Valores inesperados e estornos", icon: CreditCard },
  { slug: "cancelamentos", label: "Cancelamentos", description: "Planos, assinaturas e serviços", icon: XCircle },
  { slug: "contratos", label: "Contratos", description: "Cláusulas, multas e rescisões", icon: Briefcase },
  { slug: "burocracia", label: "Processos burocráticos", description: "Cartórios, órgãos e requerimentos", icon: Landmark },
  { slug: "documentos", label: "Organização de documentos", description: "Separar, revisar e guardar papéis", icon: FolderOpen },
  { slug: "viagens", label: "Viagens", description: "Voos, bagagens e reservas", icon: Plane },
  { slug: "reclamacoes", label: "Solicitações e reclamações", description: "SAC, ouvidorias e protocolos", icon: Megaphone },
  { slug: "tarefas", label: "Tarefas pessoais", description: "Organizar o que precisa ser feito", icon: ListChecks },
  { slug: "tecnologia", label: "Tecnologia", description: "Contas, dispositivos e acessos", icon: Laptop },
  { slug: "servicos-publicos", label: "Serviços públicos", description: "Consultas e atendimentos públicos", icon: FileText },
  { slug: "outros", label: "Outras situações", description: "Qualquer outro desafio do dia a dia", icon: CircleHelp },
] as const satisfies readonly ProblemCategory[];

export type ProblemCategorySlug = (typeof PROBLEM_CATEGORIES)[number]["slug"];
