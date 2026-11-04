import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{siteConfig.description}</p>
        </div>
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/entrar" className="text-muted-foreground hover:text-foreground">
            Entrar
          </Link>
          <Link href="/cadastro" className="text-muted-foreground hover:text-foreground">
            Criar conta
          </Link>
        </nav>
      </Container>
      <Container className="border-t py-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} Resolve AI. As orientações geradas são informativas e não substituem advogados,
          médicos, contadores ou outros profissionais qualificados. Documentos gerados não têm validade oficial ou jurídica.
        </p>
      </Container>
    </footer>
  );
}
