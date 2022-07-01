import { Author } from "../entities/Author";

export class AuthorJSONEncoder {
  static encode(author: Author) {
    return { ...author };
  }
}
