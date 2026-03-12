import { useState, useCallback } from "react";

const STORAGE_KEY = "calc-rsvp-recent";
const MAX_RECENT = 5;

export function useRecentCalculators() {
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRecent = useCallback((id: string) => {
    setRecent(prev => {
      const updated = [id, ...prev.filter(r => r !== id)].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recent, addRecent };
}
