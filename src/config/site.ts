export const siteConfig = {
  name: "Resolve AI",
  tagline: "Transforme problemas em planos de ação.",
  description:
    "Resolve AI entende sua situação, organiza o que precisa ser feito e ajuda você a acompanhar cada passo até a solução.",
  nav: [
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Demonstração", href: "/#demonstracao" },
    { label: "Categorias", href: "/#categorias" },
    { label: "Segurança", href: "/#seguranca" },
  ],
} as const;

/** Common problem suggestions shown under the main input. */
export const PROBLEM_SUGGESTIONS = [
  "Comprei um produto com defeito e a loja não quer trocar",
  "Apareceu uma cobrança que não reconheço no meu cartão",
  "Quero cancelar um plano, mas não consigo pelo site",
  "Meu voo foi cancelado e não sei quais são meus direitos",
  "Preciso tirar a segunda via de um documento",
  "Fiz uma reclamação e ninguém respondeu",
] as const;
