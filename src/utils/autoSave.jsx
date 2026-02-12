import { useState, useEffect, useRef } from "react";

export function useAutoSave(key, form, step, setForm, setStep) {
  const [showRestore, setShowRestore] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedData(parsed);
        setShowRestore(true);
      }
    } catch (e) { /* ignore */ }
  }, [key]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify({ form, step }));
      } catch (e) { /* ignore */ }
    }, 500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [key, form, step]);

  const restore = () => {
    if (savedData) {
      if (savedData.form) setForm(savedData.form);
      if (typeof savedData.step === "number") setStep(savedData.step);
    }
    setShowRestore(false);
  };

  const dismiss = () => {
    localStorage.removeItem(key);
    setShowRestore(false);
  };

  const clear = () => { localStorage.removeItem(key); };

  return { showRestore, restore, dismiss, clear };
}
