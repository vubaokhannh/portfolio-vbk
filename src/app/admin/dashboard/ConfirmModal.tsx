"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Delete this item?",
  description = "This action cannot be undone.",
  itemName,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-sm mx-4 rounded-2xl border border-white/[0.08] bg-[#0D0F17]/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden">
              {/* Top accent bar */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

              <div className="p-6 space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide font-mono uppercase">
                        {title}
                      </h3>
                      <p className="text-[11px] text-white/40 font-mono mt-0.5">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Close X */}
                  <button
                    onClick={onCancel}
                    className="p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer shrink-0 mt-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Item name badge */}
                {itemName && (
                  <div className="px-3.5 py-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.06] font-mono text-xs text-red-300/80 truncate">
                    <span className="text-red-500/50 mr-1.5 select-none">▸</span>
                    {itemName}
                  </div>
                )}

                {/* Warning note */}
                <p className="text-[11px] text-white/30 font-mono leading-relaxed">
                  Are you sure you want to permanently delete this item? This operation{" "}
                  <span className="text-red-400/80 font-bold">cannot be undone</span>.
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={onCancel}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 hover:border-red-500/50 hover:text-red-300 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
