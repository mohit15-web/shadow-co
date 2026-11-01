import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & conditions"
      body={[
        "The full terms and conditions governing use of this site and any future purchase from Shadow Co. will be published here before the store goes live.",
        "This page is a placeholder — no terms are final yet.",
      ]}
    />
  );
}
