import { BookEntity } from '../../domain/entities/BookEntity';
import { CreateBookDto } from '../dto/CreateBookDto';
import { IBookRepository } from '../../domain/repositories/IBookRepository';

export class CreateBookCommand {
  constructor(private readonly bookRepository: IBookRepository) {}

  public async execute(createBookDto: CreateBookDto): Promise<BookEntity> {
    // Validación de duplicados
    const existingBooks = await this.bookRepository.findAll();
    const duplicateISBN = existingBooks.find(book => book.isbn === createBookDto.isbn);
    
    if (duplicateISBN) {
      throw new Error('Book with this ISBN already exists');
    }

    const book = BookEntity.create(
      createBookDto.title,
      createBookDto.author,
      createBookDto.isbn,
      createBookDto.publishedYear
    );

    await this.bookRepository.create(book);
    
    return book;
  }
}