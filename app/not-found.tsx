import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-5 text-center">
      <h1 className="text-head uppercase leading-[0.9]">Not everything is found.</h1>
      <Link href="/" className="mt-8 text-small uppercase tracking-wide hover:opacity-70">
        Back to Shadow Co. →
      </Link>
    </div>
  );
}
