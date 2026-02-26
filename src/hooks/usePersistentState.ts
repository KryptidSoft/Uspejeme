import { useState, useEffect } from 'react';
import { storageService } from '../utils/storageService';

export function usePersistentState<T>(key: string, defaultValue: T) {
  // Inicializace dat při startu
  const [state, setState] = useState<T>(() => {
    const saved = storageService.getItem<T>(key);
    return saved !== null ? saved : defaultValue;
  });

  // Uložení při každé změně stavu
  useEffect(() => {
    storageService.setItem(key, state);
  }, [key, state]);

  const isFallback = storageService.getIsFallbackActive();

  return [state, setState, isFallback] as const;
}