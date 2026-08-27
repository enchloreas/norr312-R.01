"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ShieldCheck, Cpu, Layers, Sparkles, Sliders } from "lucide-react";

interface BuildSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplodeToggle?: () => void;
  isExploded?: boolean;
}

export function BuildSpecModal({
  isOpen,
  onClose,
  onExplodeToggle,
  isExploded = false,
}: BuildSpecModalProps) {
  const [selectedSize, setSelectedSize] = useState("US 9 // 19.0mm");
  const [selectedFinish, setSelectedFinish] = useState("RAW_BRUSHED");
  const [reserved, setReserved] = useState(false);
  const [reservationName, setReservationName] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [reservationStep, setReservationStep] = useState<"form" | "confirmed">("form");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const sizes = [
    { label: "US 7", mm: "17.3mm", eu: "54" },
    { label: "US 8", mm: "18.2mm", eu: "57" },
    { label: "US 9", mm: "19.0mm", eu: "60" },
    { label: "US 10", mm: "19.8mm", eu: "62" },
    { label: "US 11", mm: "20.6mm", eu: "65" },
    { label: "US 12", mm: "21.4mm", eu: "67" },
  ];

  const finishes = [
    { id: "RAW_BRUSHED", name: "Raw Brushed Titanium", desc: "Directional 400-grit satin finish with natural luster" },
    { id: "DLC_MATTE", name: "DLC Obsidian Black", desc: "Diamond-Like Carbon coating, extreme 3500 HV scratch resistance" },
    { id: "THERMAL_INDIGO", name: "Thermal Oxide Indigo", desc: "Heat-tempered spectrum iridescent titanium finish" },
  ];

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationEmail) return;
    setReserved(true);
    setReservationStep("confirmed");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl rounded-lg border border-[#30333d] bg-[#14151a] p-6 sm:p-8 shadow-2xl text-[#e2e4e9] z-10 my-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#252830] pb-4 mb-6">
              <div>
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#c8a265] uppercase">
                  TECHNICAL BLUEPRINT // NO.rr 312
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white mt-1">
                  SPECIFICATIONS: MOD. R1 V3
                </h2>
                <div className="text-xs font-mono text-[#8a8f9d] mt-0.5">
                  REVISION CODE: PATCH_v3.12 · BATCH ALLOCATION: 08 / 30
                </div>
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded border border-[#2b2e38] text-[#8e94a0] hover:border-white/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {reservationStep === "form" ? (
              <div className="space-y-6">
                {/* 3D Exploded View Trigger Bar */}
                <div className="flex items-center justify-between p-3 rounded bg-[#1a1b22] border border-[#262832]">
                  <div className="flex items-center gap-3">
                    <Layers className="text-[#c8a265] w-5 h-5" />
                    <div>
                      <div className="text-xs font-mono font-semibold text-white">
                        INTERACTIVE SCHEMATIC EXPLODED VIEW
                      </div>
                      <div className="text-[11px] font-mono text-[#8a8f9d]">
                        Toggle 3D model component separation & tension bridge inspection
                      </div>
                    </div>
                  </div>
                  {onExplodeToggle && (
                    <button
                      type="button"
                      onClick={onExplodeToggle}
                      className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                        isExploded
                          ? "bg-[#c8a265]/20 border-[#c8a265] text-[#e5d2a8]"
                          : "border-[#3a3e4d] bg-[#22242c] text-[#a0a6b5] hover:border-[#c8a265]"
                      }`}
                    >
                      {isExploded ? "COLLAPSE MODEL" : "EXPLODE 3D MODEL"}
                    </button>
                  )}
                </div>

                {/* Technical Parameters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded bg-[#181920] border border-[#22242d]">
                    <div className="text-[10px] font-mono text-[#787e8e] uppercase">PRIMARY ALLOY</div>
                    <div className="text-sm font-mono font-bold text-white mt-1">Ti-6Al-4V</div>
                    <div className="text-[10px] font-mono text-[#a0a6b5]">Grade 5 Aerospace</div>
                  </div>
                  <div className="p-3 rounded bg-[#181920] border border-[#22242d]">
                    <div className="text-[10px] font-mono text-[#787e8e] uppercase">SPRING WIRE CORE</div>
                    <div className="text-sm font-mono font-bold text-white mt-1">9x 316L Cable</div>
                    <div className="text-[10px] font-mono text-[#a0a6b5]">Surgical Stainless</div>
                  </div>
                  <div className="p-3 rounded bg-[#181920] border border-[#22242d]">
                    <div className="text-[10px] font-mono text-[#787e8e] uppercase">TOTAL MASS</div>
                    <div className="text-sm font-mono font-bold text-white mt-1">18.40 g</div>
                    <div className="text-[10px] font-mono text-[#a0a6b5]">Skeletal Lightness</div>
                  </div>
                  <div className="p-3 rounded bg-[#181920] border border-[#22242d]">
                    <div className="text-[10px] font-mono text-[#787e8e] uppercase">CNC TOLERANCE</div>
                    <div className="text-sm font-mono font-bold text-white mt-1">±0.005 mm</div>
                    <div className="text-[10px] font-mono text-[#a0a6b5]">Wire-EDM Sliced</div>
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <label className="block text-xs font-mono tracking-widest text-[#a0a6b5] uppercase mb-2">
                    RING SIZING CALIBRATION (INNER DIAMETER):
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {sizes.map((s) => {
                      const fullVal = `${s.label} // ${s.mm}`;
                      const isSel = selectedSize === fullVal;
                      return (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => setSelectedSize(fullVal)}
                          className={`p-2.5 rounded border text-center font-mono transition-all ${
                            isSel
                              ? "border-[#c8a265] bg-[#22211d] text-[#f0e2be] shadow-[0_0_12px_rgba(200,162,101,0.2)]"
                              : "border-[#262832] bg-[#17181f] text-[#8e94a0] hover:border-[#3d4250]"
                          }`}
                        >
                          <div className="text-xs font-bold">{s.label}</div>
                          <div className="text-[10px] text-[#717684]">{s.mm}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Surface Treatment Finish */}
                <div>
                  <label className="block text-xs font-mono tracking-widest text-[#a0a6b5] uppercase mb-2">
                    SURFACE METALLURGICAL FINISH:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {finishes.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFinish(f.id)}
                        className={`p-3 rounded border text-left font-mono transition-all ${
                          selectedFinish === f.id
                            ? "border-[#c8a265] bg-[#201e19] text-[#f2e6cb]"
                            : "border-[#262832] bg-[#17181f] text-[#8e94a0] hover:border-[#3d4250]"
                        }`}
                      >
                        <div className="text-xs font-bold">{f.name}</div>
                        <div className="text-[10px] text-[#717684] mt-1 line-clamp-2">{f.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reservation Form */}
                <form onSubmit={handleReserve} className="pt-2 border-t border-[#252830]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#8a8f9d] mb-1">
                        RECIPIENT NAME / CALLSIGN:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Richter"
                        value={reservationName}
                        onChange={(e) => setReservationName(e.target.value)}
                        className="w-full rounded border border-[#2b2e38] bg-[#111216] px-3 py-2 text-xs font-mono text-white focus:border-[#c8a265] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#8a8f9d] mb-1">
                        DISPATCH EMAIL:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={reservationEmail}
                        onChange={(e) => setReservationEmail(e.target.value)}
                        className="w-full rounded border border-[#2b2e38] bg-[#111216] px-3 py-2 text-xs font-mono text-white focus:border-[#c8a265] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs font-mono text-[#8a8f9d]">
                      PRICE: <span className="text-white font-bold">$780 USD</span> · INCLUDES CRYPTO CERTIFICATE OF AUTHENTICITY
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded font-mono text-xs tracking-widest uppercase btn-spec-gold font-semibold"
                    >
                      RESERVE ALLOCATION // PATCH_v3.12
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4 font-mono">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#c8a265] bg-[#c8a265]/10 text-[#e5d2a8]">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  ALLOCATION REGISTERED // SERIAL #312-R1-08
                </h3>
                <p className="text-xs text-[#a0a6b5] max-w-md mx-auto">
                  Thank you, {reservationName || "Collector"}. Your reservation for MOD. R1 V3 ({selectedSize}, {selectedFinish}) has been secured in the batch queue. A verification dossier and sizing kit confirmation was dispatched to <span className="text-white">{reservationEmail}</span>.
                </p>
                <div className="p-3 bg-[#111216] rounded border border-[#252830] max-w-xs mx-auto text-[11px] text-[#8a8f9d]">
                  ESTIMATED CNC DISPATCH: 14 DAYS<br />
                  TRACKING HASH: 0x312_7f9c...b41
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded border border-[#30333d] bg-[#1c1e24] text-xs text-white hover:border-[#c8a265] transition-colors"
                >
                  RETURN TO ARTIFACT
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
