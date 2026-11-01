import type { Metadata } from "next";
import { Unbounded, Onest } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { IntroOverlay } from "@/components/IntroOverlay";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["800"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Shadow Co. — We choose what deserves to be said.",
    template: "%s — Shadow Co.",
  },
  description:
    "Shadow Co. is a chapter-based streetwear label for people who observe more than they speak. Drop 001 — The Unheard: three designs, eighteen pieces, one statement.",
  openGraph: {
    title: "Shadow Co.",
    description: "We don't need to speak about everything. We choose what deserves to be said.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unbounded.variable} ${onest.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg text-ink">
        <CartProvider>
          <ToastProvider>
            <IntroOverlay />
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
