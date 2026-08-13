"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

export const Toast = ({ message, duration = 5000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed top-4 right-4 z-[9999] max-w-sm transform transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
    >
      <div className="bg-[#263238] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <p className="text-sm flex-1">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>,
    document.body
  );
};
