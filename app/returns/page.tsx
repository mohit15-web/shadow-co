import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Returns & Exchanges" };

export default function ReturnsPage() {
  return (
    <PolicyPage
      title="Returns & exchanges"
      body={[
        "Each piece in Drop 001 is limited to a small edition. Our return and exchange policy — including windows, condition requirements and the exchange process for a limited run — will be confirmed and published here before launch.",
        "This page is a placeholder — no returns terms are final yet.",
      ]}
    />
  );
}
