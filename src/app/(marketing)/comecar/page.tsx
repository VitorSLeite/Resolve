import type { Metadata } from "next";
import { DraftReview } from "@/features/problems/draft-review";

export const metadata: Metadata = { title: "Começar" };

export default function StartPage() {
  return <DraftReview />;
}
