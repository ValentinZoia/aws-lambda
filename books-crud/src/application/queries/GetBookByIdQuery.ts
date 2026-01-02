import { BookEntity } from '../../domain/entities/BookEntity';
import { IBookRepository } from '../../domain/repositories/IBookRepository';

export class GetBookByIdQuery {
  constructor(private readonly bookRepository: IBookRepository) {}

  public async execute(id: string): Promise<BookEntity> {
    const bookData = await this.bookRepository.findById(id);
    
    if (!bookData) {
      throw new Error(`Book with id ${id} not found`);
    }

    // Convert IBook back to BookEntity
    return new BookEntity(
      bookData.id,
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.publishedYear,
      bookData.createdAt,
      bookData.updatedAt
    );
  }
}