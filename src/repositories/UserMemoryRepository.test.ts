import User from "../entities/User";
import { UserMemoryRepository } from "./UserMemoryRepository";

describe("UserMemoryRepository", () => {
  let user1: User;
  let user2: User;
  let user3: User;
  let userMemoryRepository: UserMemoryRepository;

  const usersStore: Map<number, User> = new Map();

  beforeAll(() => {
    userMemoryRepository = new UserMemoryRepository(usersStore);
    user1 = new User("naruto@konoha.com", "naruto", "uzumaki");
    user1.id = 1;
    user2 = new User("kirito@sao.com", "kirigaya", "kazuto");
    user2.id = 2;
    user3 = new User("asuna@sao.com", "asuna", "yuuki");
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
      const user = new User("anya", "anya@familyspy.com", "forger");
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
