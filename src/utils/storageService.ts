/**
 * Abstraktní vrstva pro úložiště dat.
 * Pokud localStorage není dostupný, automaticky přepíná na In-Memory objekt.
 */

class StorageService {
  private inMemoryStorage: Record<string, string> = {};
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = this.testAvailability();
  }

  private testAvailability(): boolean {
    try {
      const testKey = "__storage_test__";
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn("LocalStorage není dostupný (Private mode/Full). Přepínám na In-Memory storage.");
      return false;
    }
  }

  setItem(key: string, value: any): void {
    const stringValue = JSON.stringify(value);
    if (this.isLocalStorageAvailable) {
      try {
        window.localStorage.setItem(key, stringValue);
      } catch (e) {
        console.error("Chyba při zápisu do LocalStorage (pravděpodobně plný).");
      }
    } else {
      this.inMemoryStorage[key] = stringValue;
    }
  }

  getItem<T>(key: string): T | null {
    const data = this.isLocalStorageAvailable 
      ? window.localStorage.getItem(key) 
      : this.inMemoryStorage[key];

    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.removeItem(key);
    } else {
      delete this.inMemoryStorage[key];
    }
  }

  // Upozornění pro UI komponenty
  public getIsFallbackActive(): boolean {
    return !this.isLocalStorageAvailable;
  }
}

export const storageService = new StorageService();