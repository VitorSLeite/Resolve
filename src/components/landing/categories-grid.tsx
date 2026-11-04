import { Container, SectionHeading } from "@/components/ui/container";
import { PROBLEM_CATEGORIES } from "@/config/categories";

export function CategoriesGrid() {
  return (
    <section id="categorias" className="scroll-mt-20 border-t py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Categorias"
          title="Para os problemas reais do dia a dia"
          description="A IA identifica a categoria automaticamente — e você pode alterá-la quando quiser."
        />
        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_CATEGORIES.map((c) => (
            <li key={c.slug} className="flex items-start gap-3 rounded-xl border bg-card p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                <c.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
