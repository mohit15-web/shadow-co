import { Reveal } from "./Reveal";

export function PolicyPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="px-5 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[700px]">
        <Reveal>
          <h1 className="text-head uppercase leading-[0.9]">{title}</h1>
        </Reveal>
        <Reveal delay={0.08} className="mt-10 flex flex-col gap-5">
          {body.map((p, i) => (
            <p key={i} className="text-body text-muted">
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
