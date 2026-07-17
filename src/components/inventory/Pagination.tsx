import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  basePath = "/inventory",
  searchParams,
}: {
  page: number;
  totalPages: number;
  basePath?: string;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => {
    const sp = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== "page") sp.set(k, v);
    });
    if (p > 1) sp.set("page", String(p));
    const q = sp.toString();
    return q ? `${basePath}?${q}` : basePath;
  };

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        className={`btn-ghost ${page <= 1 ? "pointer-events-none opacity-40" : ""}`}
        aria-disabled={page <= 1}
      >
        Previous
      </Link>
      <span className="px-4 text-sm text-muted">
        Page {page} of {totalPages}
      </span>
      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        className={`btn-ghost ${page >= totalPages ? "pointer-events-none opacity-40" : ""}`}
        aria-disabled={page >= totalPages}
      >
        Next
      </Link>
    </nav>
  );
}
