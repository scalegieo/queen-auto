import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-[var(--header-h)] text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you’re looking for doesn’t exist or the vehicle may have been
        sold.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/inventory" className="btn-primary">
          View Inventory
        </Link>
        <Link href="/" className="btn-secondary">
          Back Home
        </Link>
      </div>
    </div>
  );
}
