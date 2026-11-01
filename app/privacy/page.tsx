import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      body={[
        "Shadow Co. respects the privacy of everyone who visits this site. A full privacy policy — covering what data is collected, how it's used and how to request its removal — will be published here before the site handles real orders.",
        "This page is a placeholder — no privacy terms are final yet.",
      ]}
    />
  );
}
