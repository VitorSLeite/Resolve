import { LinkButton } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <LogoMark className="mx-auto h-10 w-10" />
        <p className="mt-6 font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">Esse endereço não existe ou foi movido.</p>
        <LinkButton href="/" className="mt-6">
          Voltar ao início
        </LinkButton>
      </div>
    </main>
  );
}
