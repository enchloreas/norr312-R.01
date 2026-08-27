import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 bg-concrete-surface concrete-noise font-mono select-none">
      <div className="text-xs tracking-[0.28em] text-[#c8a265] uppercase mb-2">
        ERROR CODE: 404 // ARTIFACT NOT FOUND
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
        VIEWPORT COORDINATES INVALID
      </h2>
      <p className="text-xs sm:text-sm text-[#8e94a0] max-w-md mb-8 leading-relaxed">
        The requested artifact, blueprint, or release route does not exist in the NO.rr 312 registry.
      </p>
      <Link
        href="/"
        className="btn-spec-gold px-6 py-2.5 rounded text-xs tracking-widest uppercase transition-all duration-200"
      >
        RETURN TO 3D VIEWPORT
      </Link>
    </div>
  );
}
