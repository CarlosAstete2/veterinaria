import { Injectable } from '@angular/core';

export interface Identifiable {
  id: string;
}

@Injectable()
export abstract class StorageService<T extends Identifiable> {
  protected abstract readonly storageKey: string;

  private read(): T[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? (JSON.parse(raw) as T[]) : [];
  }

  private write(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  findAll(): T[] {
    return this.read();
  }

  findById(id: string): T | undefined {
    return this.read().find((item) => item.id === id);
  }

  save(item: T): void {
    const items = this.read();
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx >= 0) {
      items[idx] = item;
    } else {
      items.push(item);
    }
    this.write(items);
  }

  delete(id: string): void {
    this.write(this.read().filter((i) => i.id !== id));
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
