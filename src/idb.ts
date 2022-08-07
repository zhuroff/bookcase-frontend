import Dexie, { Table } from 'dexie';
import { TBookPage } from './types/Books';

export class LocalDrafts extends Dexie {
  books!: Table<TBookPage>;

  constructor() {
    super('draftsDB');
    this.version(1).stores({
      books: '++_id'
    });
  }
}

export const idb = new LocalDrafts();