import { IUser } from "./IUser";

class User implements IUser {
  id?: number;
  email: string;
  name: string;
  lastname: string;

  constructor(email: string, name: string, lastname: string) {
    this.id = undefined;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
  }
}

export default User;
