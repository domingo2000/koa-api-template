import { IAuthor } from "./IAuthor";

class Author implements IAuthor {
  id?: number;
  name: string;
  lastname: string;

  constructor(name: string, lastname: string) {
    this.id = undefined;
    this.name = name;
    this.lastname = lastname;
  }
}

export default Author;
