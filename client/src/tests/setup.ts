import '@testing-library/jest-dom';
import { beforeEach } from 'vitest';

// Create a proper localStorage implementation for tests
class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

globalThis.localStorage = new LocalStorageMock();

// Reset localStorage before each test
beforeEach(() => {
  localStorage.clear();
  // Clear document classes
  document.documentElement.className = '';
});
