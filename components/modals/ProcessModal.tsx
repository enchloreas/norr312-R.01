"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cpu, Wrench, Shield, Compass, Sparkles } from "lucide-react";

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProcessModal({ isOpen, onClose }: ProcessModalProps) {
  const steps = [
    {
      num: "01",
      title: "Generative FEA & Structural Optimization",
      desc: "Every jewelry artifact begins with algorithmic finite element analysis (FEA). We calculate stress loads across the skeletal bands and tune the spring tension bridge to achieve equilibrium between mechanical rigidity and comfort.",
      icon: Cpu,
    },
    {
      num: "02",
      title: "5-Axis Subtractive CNC Machining",
      desc: "Carved from solid billets of Aerospace Ti-6Al-4V (Grade 5 Titanium). 5-axis high-speed CNC milling ensures tolerances within ±0.005mm, creating chamfered edges, truss windows, and micro-threaded Torx screw housings.",
      icon: Wrench,
    },
    {
      num: "03",
      title: "Wire-EDM Spring Core Calibration",
      desc: "Electrical Discharge Machining (Wire-EDM) slices the 9-strand 316L stainless steel suspension spring wire bundle. Each spring strand is individually tensioned and anchored through the horizontal titanium cross-pins.",
      icon: Compass,
    },
    {
      num: "04",
      title: "Directional Satin Finishing & Hand-Brushing",
      desc: "Each piece undergoes manual 400-grit directional satin hand-brushing followed by multi-stage ultrasonic degreasing. The resulting anisotropic texture plays against directional ambient light.",
      icon: Sparkles,
    },
    {
      num: "05",
      title: "Micro-Engraving & Cryptographic Verification",
      desc: "High-precision UV laser micro-engraves internal technical callouts (PATCH v1.3, GUID R1, batch serial number). Each piece is paired with an encrypted cryptographic physical-digital certificate.",
      icon: Shield,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl rounded-lg border border-[#30333d] bg-[#14151a] p-6 sm:p-8 shadow-2xl text-[#e2e4e9] z-10 my-auto font-mono"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#252830] pb-4 mb-6">
              <div>
                <div className="text-[11px] tracking-[0.25em] text-[#c8a265] uppercase">
                  ENGINEERING PHILOSOPHY // NO.rr 312
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                  METALLURGY & FABRICATION PROCESS
                </h2>
                <div className="text-xs text-[#8a8f9d] mt-0.5">
                  DECONSTRUCTING TRADITIONAL JEWELRY INTO KINETIC INDUSTRIAL ARCHITECTURE
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

            {/* Steps Timeline */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-4 sm:p-5 rounded-lg bg-[#181920] border border-[#262832] flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="grid h-10 w-10 place-items-center rounded bg-[#20222a] border border-[#30333d] text-[#c8a265]">
                        <Icon size={18} />
                      </div>
                      <span className="text-xs font-bold text-[#c8a265] sm:hidden">
                        PHASE {step.num}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">
                          {step.title}
                        </h3>
                        <span className="hidden sm:inline-block text-[11px] text-[#646a78]">
                          PHASE {step.num}
                        </span>
                      </div>
                      <p className="text-xs text-[#8e94a0] mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[#252830] flex items-center justify-between text-xs text-[#8a8f9d]">
              <div>BERLIN & TOKYO PRECISION ATELIERS</div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded border border-[#30333d] bg-[#1c1e24] text-xs text-white hover:border-[#c8a265] transition-colors"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
