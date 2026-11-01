import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <PolicyPage
      title="Shipping"
      body={[
        "Shadow Co. is preparing for its first release. Shipping rates, carriers and delivery windows for Drop 001 will be published here before the chapter opens for orders.",
        "This page is a placeholder — no shipping terms are final yet.",
      ]}
    />
  );
}
