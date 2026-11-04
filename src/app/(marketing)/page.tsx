import { Benefits } from "@/components/landing/benefits";
import { CategoriesGrid } from "@/components/landing/categories-grid";
import { DemoPreview } from "@/components/landing/demo-preview";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Security } from "@/components/landing/security";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <DemoPreview />
      <Benefits />
      <CategoriesGrid />
      <Security />
      <FinalCta />
    </>
  );
}
