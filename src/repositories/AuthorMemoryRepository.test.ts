import Author from "../entities/Author";
import { AuthorMemoryRepository } from "./AuthorMemoryRepository";

describe("AuthorMemoryRepository", () => {
  let user1: Author;
  let user2: Author;
  let user3: Author;
  let userMemoryRepository: AuthorMemoryRepository;

  const usersStore: Map<number, Author> = new Map();

  beforeAll(() => {
    userMemoryRepository = new AuthorMemoryRepository(usersStore);
    user1 = new Author("naruto", "uzumaki");
    user1.id = 1;
    user2 = new Author("kirigaya", "kazuto");
    user2.id = 2;
    user3 = new Author("asuna", "yuuki");
    user3.id = 3;

    usersStore.set(user1.id, user1);
    usersStore.set(user2.id, user2);
    usersStore.set(user3.id, user3);
  });

  describe("#findById", () => {
    test("should find the user by id", async () => {
      const user = await userMemoryRepository.findById(1);
      expect(user).toEqual(usersStore.get(1));
    });
  });

  describe("#findAll", () => {
    test("should get a list of users", async () => {
      const users = await userMemoryRepository.findAll();
      expect(users).toEqual([user1, user2, user3]);
    });
  });

  describe("#save", () => {
    test("when user is new", async () => {
      const user = new Author("anya", "forger");
      const size = usersStore.size;

      expect(user.id).not.toBeDefined();

      await userMemoryRepository.save(user);

      expect(user.id).toBeDefined();
      expect(usersStore.size).toBe(size + 1);
    });

    test("when user already exists", async () => {
      const size = usersStore.size;

      await userMemoryRepository.save(user1);

      expect(user1.id).toBe(user1.id);
      expect(usersStore.get(1)).toEqual(user1);
      expect(usersStore.size).toBe(size);
    });
  });

  describe("#delete", () => {
    test("should delete a user", async () => {
      const size = usersStore.size;

      expect(usersStore.get(1)).toBeDefined();

      await userMemoryRepository.delete(user1);

      expect(usersStore.size).toBe(size - 1);
      expect(usersStore.get(1)).toBeUndefined();
    });
  });
});
