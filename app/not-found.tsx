import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold tracking-tight text-white mb-4">404 — Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-lg text-[#9aa1ae]">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-[#8b5cf6] px-6 py-3 font-medium text-white transition-colors hover:bg-[#7c3aed]"
      >
        Return Home
      </Link>
    </div>
  );
}
