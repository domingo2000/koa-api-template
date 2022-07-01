export interface IRepository<T, K> {
  findById: (id: K) => Promise<T | null>;
  findAll: () => Promise<T[]>;
  save: (object: T) => Promise<void>;
  delete: (object: T) => Promise<void>;
  clean: () => Promise<void>; // Delete all the records
}
