import Link from "next/link";

export function AuthLayout({
  children,
  backHref = "/",
}: {
  children: React.ReactNode;
  backHref?: string;
}) {
  return (
    <main className="min-h-screen w-full bg-[#f7f5f0] relative overflow-hidden flex items-center justify-center px-6 py-10">
      {/* Circle decorations */}
      <div className="absolute w-96 h-96 rounded-full bg-[#448A5B] opacity-10 -top-24 -right-24 pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-[#448A5B] opacity-10 -bottom-16 -left-16 pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full bg-[#448A5B] opacity-5 top-1/2 right-12 pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg px-10 py-12">
        <Link
          href={backHref}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-foreground transition hover:bg-zinc-50 mb-6"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="size-4"
            aria-hidden="true"
          >
            <path
              d="m10 4-4 4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        {children}
      </div>
    </main>
  );
}

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="flex flex-col gap-1 mb-6">
      <h1 className="text-[24px] font-semibold leading-8 tracking-tight text-foreground">
        {title}
      </h1>
      <p className="text-base leading-6 text-gray-500">{subtitle}</p>
    </header>
  );
}

export function AuthFooter({
  linkText,
  linkHref,
  prompt,
}: {
  linkText: string;
  linkHref: string;
  prompt?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm mt-4">
      {prompt && <span className="text-gray-500">{prompt}</span>}
      <Link
        href={linkHref}
        className="text-[#448A5B] font-medium hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
}
