import Author from "../entities/Author";
import { IRepository } from "./IRepository";

export class AuthorMemoryRepository implements IRepository<Author, number> {
  store: Map<number, Author>;

  constructor(usersStore: Map<number, Author>) {
    this.store = usersStore;
  }

  async findById(id: number) {
    const user = this.store.get(id);
    if (user) {
      return user;
    }
    return null;
  }

  async findAll() {
    const users = Array.from(this.store.values());
    return users;
  }

  async save(object: Author) {
    const id = object.id ? object.id : this.createNewId();
    object.id = id;
    this.store.set(id, object);
  }

  async update(object: Author) {
    if (object.id) {
      this.store.set(object.id, object);
      return;
    }
    throw new Error("The Author Could Not Be Updated");
  }

  async delete(object: Author) {
    if (object.id) {
      this.store.delete(object.id);
      return;
    }
    throw new Error("The Author Could Not Be Deleted");
  }

  private createNewId() {
    const currentId = Math.max(0, ...this.store.keys());
    return currentId + 1;
  }
}
