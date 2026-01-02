import 'reflect-metadata';
import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { DynamoDbBookRepositoryImpl } from '../repositories/DynamoDbBookRepositoryImpl';
import { CreateBookCommand } from '../../application/commands/CreateBookCommand';
import { GetBookByIdQuery } from '../../application/queries/GetBookByIdQuery';

export class DIContainer {
  private static bookRepository: IBookRepository;
  private static createBookCommand: CreateBookCommand;
  private static getBookByIdQuery: GetBookByIdQuery;

  public static getBookRepository(): IBookRepository {
    if (!this.bookRepository) {
      this.bookRepository = new DynamoDbBookRepositoryImpl();
    }
    return this.bookRepository;
  }

  public static getCreateBookCommand(): CreateBookCommand {
    if (!this.createBookCommand) {
      this.createBookCommand = new CreateBookCommand(this.getBookRepository());
    }
    return this.createBookCommand;
  }

  public static getGetBookByIdQuery(): GetBookByIdQuery {
    if (!this.getBookByIdQuery) {
      this.getBookByIdQuery = new GetBookByIdQuery(this.getBookRepository());
    }
    return this.getBookByIdQuery;
  }
}