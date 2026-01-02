import { BookEntity } from '../entities/BookEntity';
import { IBook } from '../entities/BookEntity';

export interface IBookRepository {
  create(book: BookEntity): Promise<IBook>;
  findById(id: string): Promise<IBook | null>;
  findAll(): Promise<IBook[]>;
  update(id: string, book: Partial<IBook>): Promise<IBook>;
  delete(id: string): Promise<void>;
}