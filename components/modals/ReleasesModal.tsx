"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, Box, CheckCircle2, Clock } from "lucide-react";

interface ReleasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "releases" | "archive";
}

export function ReleasesModal({ isOpen, onClose, initialTab = "releases" }: ReleasesModalProps) {
  const [activeTab, setActiveTab] = useState<"releases" | "archive">(initialTab);

  const releases = [
    {
      id: "MOD_R1_V3",
      code: "MOD. R1 V3",
      name: "Tension Core Ring",
      status: "ACTIVE BATCH",
      statusColor: "text-[#c8a265] border-[#c8a265]/40 bg-[#c8a265]/10",
      alloy: "Grade 5 Titanium (Ti-6Al-4V) + 316L Multi-wire Spring",
      hardware: "4x M1.6 Micro-Torx fasteners · Wire-EDM suspension bridge",
      weight: "18.4g",
      batch: "08 / 30 Allocation Remaining",
      patch: "PATCH_v3.12",
      price: "$780",
    },
    {
      id: "MOD_R1_V2",
      code: "MOD. R1 V2",
      name: "Monolith Titanium Band",
      status: "ARCHIVED / SOLD OUT",
      statusColor: "text-[#787e8e] border-[#787e8e]/40 bg-[#787e8e]/10",
      alloy: "Pure Solid Ti-6Al-4V Titanium",
      hardware: "5-axis monolithic CNC cut · Anisotropic satin polish",
      weight: "16.1g",
      batch: "Edition of 25 (Sold Out)",
      patch: "PATCH_v2.01",
      price: "$650",
    },
    {
      id: "MOD_B2",
      code: "MOD. B2",
      name: "Kinetic Link Bracelet",
      status: "UPCOMING DROP",
      statusColor: "text-[#60a5fa] border-[#60a5fa]/40 bg-[#60a5fa]/10",
      alloy: "Titanium Chassis with Articulated Steel Flex Cables",
      hardware: "Magnetic interlock clasp with mechanical safety pin",
      weight: "42.8g",
      batch: "Limited to 20 Units · Dropping Nov 2026",
      patch: "PATCH_v4.00",
      price: "$1,150",
    },
    {
      id: "MOD_P1",
      code: "MOD. P1",
      name: "Gimbal Tension Pendant",
      status: "IN PROTOTYPING",
      statusColor: "text-[#a78bfa] border-[#a78bfa]/40 bg-[#a78bfa]/10",
      alloy: "Grade 5 Titanium Outer Cage, Floating Gyroscopic Core",
      hardware: "Ball-bearing suspension, 2.5mm curb titanium chain",
      weight: "24.0g",
      batch: "Prototype Validation Phase",
      patch: "PATCH_v4.10",
      price: "TBA",
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
            className="relative w-full max-w-3xl rounded-lg border border-[#30333d] bg-[#14151a] p-6 sm:p-8 shadow-2xl text-[#e2e4e9] z-10 my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#252830] pb-4 mb-6">
              <div>
                <div className="text-[11px] font-mono tracking-[0.25em] text-[#c8a265] uppercase">
                  NO.rr 312 // CATALOG & REGISTRY
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white mt-1">
                  ARTIFACT RELEASES & ARCHIVE
                </h2>
                <div className="text-xs font-mono text-[#8a8f9d] mt-0.5">
                  SYSTEMATIC RELEASES OF MECHANICAL & ARCHITECTURAL JEWELRY
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

            {/* Releases Cards */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {releases.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-lg bg-[#181920] border border-[#262832] hover:border-[#3a3f50] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#22242d] pb-3 mb-3">
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-[#c8a265]">
                        {item.code}
                      </span>
                      <h3 className="text-base font-bold font-mono text-white mt-0.5">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-1 rounded border ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs font-mono text-white font-bold ml-2">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#8a8f9d]">
                    <div>
                      <span className="text-[#646a78]">ALLOY:</span> {item.alloy}
                    </div>
                    <div>
                      <span className="text-[#646a78]">HARDWARE:</span> {item.hardware}
                    </div>
                    <div>
                      <span className="text-[#646a78]">MASS:</span> {item.weight}
                    </div>
                    <div>
                      <span className="text-[#646a78]">BATCH LIMIT:</span> {item.batch}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 flex items-center justify-between border-t border-[#20222b] text-[11px] font-mono text-[#787e8e]">
                    <span>DEPLOYMENT: {item.patch}</span>
                    <span className="text-[#a0a6b5] hover:text-white transition-colors cursor-pointer">
                      VIEW FULL DOSSIER →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[#252830] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#8a8f9d]">
              <div>AUTHENTICATED ON-CHAIN REGISTRY FOR ALL PHYSICAL ARTIFACTS</div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded border border-[#30333d] bg-[#1c1e24] text-xs text-white hover:border-[#c8a265] transition-colors"
              >
                CLOSE CATALOG
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
