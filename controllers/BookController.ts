import {
  RouterContext,
  BodyForm,
} from "https://raw.githubusercontent.com/oakserver/oak/main/mod.ts";
import { validate } from "../utils/token.ts";
import { getBooksByOwnerId, createBook, getBookById } from "../models/Books.ts";
import { UnauthorizedError, ParameterRequired } from "../utils/errors.ts";
import { getUserIdFromAuthorization } from "../utils/auth.ts";

export default class BookController {
  public async createBook(context: RouterContext) {
    const userId = await getUserIdFromAuthorization(context);

    const { value } = (await context.request.body()) as BodyForm;

    const title = value.get("title");
    const message = value.get("message");
    const author = value.get("author");
    const url = value.get("url");

    if (title === null || message === null || author === null || url === null) {
      throw new ParameterRequired();
    }

    await createBook({ title, message, author, url }, userId);

    context.response.body = { success: true };
  }

  public async getBooks(context: RouterContext) {
    console.log(context.request.headers);

    const authorization = context.request.headers.get("authorization");
    console.log(authorization);

    if (authorization === null) {
      throw new UnauthorizedError();
    }

    const token = authorization.replace("Bearer ", "");
    console.log(token);

    const validation = await validate(token);
    console.log(validation);

    if (!validation.isValid) {
      throw new UnauthorizedError();
    }

    const userId = validation.payload?.userId as string;

    if (userId === undefined) {
      throw new UnauthorizedError();
    }

    const books = await getBooksByOwnerId(userId);

    context.response.body = books;
  }

  public async getBook(context: RouterContext) {
    const userId = await getUserIdFromAuthorization(context);

    const bookId = Number(context.params?.id) || null;

    if (bookId === null) {
      throw new ParameterRequired();
    }

    const book = await getBookById(bookId, userId);

    context.response.body = book;
  }

  public updateBook(context: RouterContext) {
    const id = context.params?.id || null;
    context.response.body = "updateBook : " + id;
  }

  public deleteBook(context: RouterContext) {
    const id = context.params?.id || null;
    context.response.body = "deleteBook : " + id;
  }
}
