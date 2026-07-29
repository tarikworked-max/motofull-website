"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const DemoContext = createContext<{ open: () => void }>({ open: () => {} });

export const useDemo = () => useContext(DemoContext);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const open = useCallback(() => {
    setSent(false);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <DemoContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Demo talep formu"
          >
            <motion.div
              className="glass-strong relative w-full max-w-md rounded-3xl p-8"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Kapat"
                className="absolute right-4 top-4 rounded-full p-2 text-mist transition hover:bg-white/10 hover:text-frost"
              >
                <X className="h-5 w-5" />
              </button>

              {sent ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <CheckCircle2 className="h-14 w-14 text-accent" />
                  <h3 className="font-display text-2xl font-bold text-frost">Talebiniz alındı!</h3>
                  <p className="text-mist">
                    Ekibimiz en geç 1 iş günü içinde sizinle iletişime geçecek.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                      <CalendarCheck className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-frost">Demo Talep Et</h3>
                      <p className="text-sm text-mist">15 dakikalık ücretsiz tanıtım</p>
                    </div>
                  </div>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    {[
                      { id: "name", label: "Ad Soyad", type: "text", ph: "Adınız" },
                      { id: "workshop", label: "Servis Adı", type: "text", ph: "Servisinizin adı" },
                      { id: "phone", label: "Telefon", type: "tel", ph: "05xx xxx xx xx" },
                    ].map((f) => (
                      <label key={f.id} className="flex flex-col gap-1.5 text-sm font-medium text-frost">
                        {f.label}
                        <input
                          required
                          type={f.type}
                          name={f.id}
                          placeholder={f.ph}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-mist/50 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
                        />
                      </label>
                    ))}
                    <button
                      type="submit"
                      className="mt-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition hover:bg-accent-soft glow-orange"
                    >
                      Demo Talebini Gönder
                    </button>
                    <p className="text-center text-xs text-mist/70">
                      Bilgileriniz yalnızca demo süreci için kullanılır.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DemoContext.Provider>
  );
}
