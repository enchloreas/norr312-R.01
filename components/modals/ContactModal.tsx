"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, MapPin, CheckCircle2, Send } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("BESPOKE_INQUIRY");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitting(true);
    // Simulate instantaneous dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

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
            className="relative w-full max-w-2xl rounded-lg border border-[#30333d] bg-[#14151a] p-6 sm:p-8 shadow-2xl text-[#e2e4e9] z-10 my-auto font-mono"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#252830] pb-4 mb-6">
              <div>
                <div className="text-[11px] tracking-[0.25em] text-[#c8a265] uppercase">
                  DIRECT CHANNEL // NO.rr 312
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                  STUDIO INQUIRIES & COMMISSIONS
                </h2>
                <div className="text-xs text-[#8a8f9d] mt-0.5">
                  BESPOKE SIZING, ALLOY EXPERIMENTATION, ARCHIVE ACQUISITIONS
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

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#8a8f9d] mb-1">
                      CLIENT IDENTIFIER / NAME:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded border border-[#2b2e38] bg-[#111216] px-3 py-2 text-xs text-white focus:border-[#c8a265] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#8a8f9d] mb-1">
                      DIRECT EMAIL CHANNEL:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-[#2b2e38] bg-[#111216] px-3 py-2 text-xs text-white focus:border-[#c8a265] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#8a8f9d] mb-1">
                    INQUIRY CATEGORY:
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded border border-[#2b2e38] bg-[#111216] px-3 py-2 text-xs text-white focus:border-[#c8a265] focus:outline-none"
                  >
                    <option value="BESPOKE_INQUIRY">Bespoke Custom Commission / Sizing Consultation</option>
                    <option value="ALLOCATION_STATUS">Allocation Status & Batch Delivery</option>
                    <option value="SPECIAL_ALLOY">Custom Alloy (Tantalum / Damascus Steel / DLC)</option>
                    <option value="PRESS_EXHIBITION">Press & Architectural Exhibition Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#8a8f9d] mb-1">
                    TRANSMISSION MESSAGE:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding sizing specifications, desired alloy, or acquisition request..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded border border-[#2b2e38] bg-[#111216] px-3 py-2 text-xs text-white focus:border-[#c8a265] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#8a8f9d]">
                    <MapPin size={13} className="text-[#c8a265]" />
                    <span>BERLIN ATELIER · TOKYO STUDIO</span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded text-xs tracking-widest uppercase btn-spec-gold font-semibold flex items-center justify-center gap-2"
                  >
                    <Send size={13} />
                    {submitting ? "TRANSMITTING..." : "TRANSMIT INQUIRY"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#c8a265] bg-[#c8a265]/10 text-[#e5d2a8]">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  TRANSMISSION RECEIVED // NO.rr 312
                </h3>
                <p className="text-xs text-[#a0a6b5] max-w-md mx-auto">
                  Thank you, {name || "Client"}. Our engineering studio has received your transmission. A technical associate will respond to <span className="text-white">{email}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded border border-[#30333d] bg-[#1c1e24] text-xs text-white hover:border-[#c8a265] transition-colors"
                >
                  RETURN TO VIEWPORT
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
