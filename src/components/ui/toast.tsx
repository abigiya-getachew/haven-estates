"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, "id">) => string;
  dismissToast: (id: string) => void;
  success: (title: string, message?: string) => string;
  error: (title: string, message?: string) => string;
  info: (title: string, message?: string) => string;
  warning: (title: string, message?: string) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let idCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 5000 }: Omit<Toast, "id">): string => {
      idCounter += 1;
      const id = `toast-${Date.now()}-${idCounter}`;
      const newToast: Toast = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
      return id;
    },
    [dismissToast],
  );

  const success = useCallback(
    (title: string, message?: string) => showToast({ type: "success", title, message }),
    [showToast],
  );

  const error = useCallback(
    (title: string, message?: string) =>
      showToast({ type: "error", title, message, duration: 8000 }),
    [showToast],
  );

  const info = useCallback(
    (title: string, message?: string) => showToast({ type: "info", title, message }),
    [showToast],
  );

  const warning = useCallback(
    (title: string, message?: string) => showToast({ type: "warning", title, message }),
    [showToast],
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function Toaster() {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts, dismissToast } = context;

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex max-w-sm flex-col gap-3 pointer-events-none"
    >
      {toasts.map((toast) => {
        const isError = toast.type === "error";
        const role = isError ? "alert" : "status";
        const ariaLive = isError ? "assertive" : "polite";

        const bgStyles = {
          success: "bg-[#252723] text-[#F7F5F0] border border-[#286746]/40 shadow-xl",
          error: "bg-[#252723] text-[#F7F5F0] border border-[#B42318]/50 shadow-xl",
          warning: "bg-[#252723] text-[#F7F5F0] border border-[#C27803]/40 shadow-xl",
          info: "bg-[#252723] text-[#F7F5F0] border border-[#315F83]/40 shadow-xl",
        }[toast.type];

        const accentColor = {
          success: "#286746",
          error: "#B42318",
          warning: "#C27803",
          info: "#315F83",
        }[toast.type];

        return (
          <div
            key={toast.id}
            role={role}
            aria-live={ariaLive}
            className={`pointer-events-auto flex items-start gap-3 rounded-lg p-4 transition-all duration-200 ${bgStyles}`}
          >
            <div
              className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            />
            <div className="flex-1 text-sm">
              <p className="font-medium text-text-inverse">{toast.title}</p>
              {toast.message && (
                <p className="mt-1 text-xs text-[#E9D8C4]/80 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-[#E9D8C4]/60 hover:text-[#E9D8C4] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent p-1 text-xs uppercase font-mono tracking-wider"
              aria-label="Dismiss notification"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
}
