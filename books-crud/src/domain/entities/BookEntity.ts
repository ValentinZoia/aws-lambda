/*

 isbn: código numérico único y estandarizado a nivel mundial que identifica de manera exclusiva un libro

*/

export interface IBook {
    id: string;
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    createdAt: Date;
    updatedAt: Date;
}

export class BookEntity implements IBook {
    public readonly id: string;
    public readonly title: string;
    public readonly author: string;
    public readonly isbn: string;
    public readonly publishedYear: number;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor(
        id: string,
        title: string,
        author: string,
        isbn: string,
        publishedYear: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publishedYear = publishedYear;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static create(
        title: string,
        author: string,
        isbn: string,
        publishedYear: number,
    ): BookEntity {
        const now = new Date();
        const id = crypto.randomUUID();

        return new BookEntity(id, title, author, isbn, publishedYear, now, now);
    }

    public update(
        title: string,
        author: string,
        publishedYear: number,
    ): BookEntity {
        return new BookEntity(
            this.id,
            title,
            author,
            this.isbn,
            publishedYear,
            this.createdAt,
            new Date(),
        );
    }

    public toJSON(): IBook {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            isbn: this.isbn,
            publishedYear: this.publishedYear,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
