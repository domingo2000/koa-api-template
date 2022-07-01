import User from "../entities/User";
import { IRepository } from "./IRepository";

export class UserMemoryRepository implements IRepository<User, number> {
  store: Map<number, User>;

  constructor(usersStore: Map<number, User>) {
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

  async save(object: User) {
    const id = object.id ? object.id : this.createNewId();
    object.id = id;
    this.store.set(id, object);
  }

  async findByEmail(email: string): Promise<User | null> {
    const id = this.findIdByEmail(email);
    if (id) {
      const user = this.findById(id);
      return user;
    }
    return null;
  }

  private findIdByEmail(email: string): number | null {
    for (const [key, user] of this.store.entries()) {
      if (user.email === email) {
        return key;
      }
    }
    return null;
  }

  async update(object: User) {
    if (object.id) {
      this.store.set(object.id, object);
      return;
    }
    throw new Error("The User Could Not Be Updated");
  }

  async delete(object: User) {
    if (object.id) {
      this.store.delete(object.id);
      return;
    }
    throw new Error("The User Could Not Be Deleted");
  }

  private createNewId() {
    const currentId = Math.max(0, ...this.store.keys());
    return currentId + 1;
  }
}
