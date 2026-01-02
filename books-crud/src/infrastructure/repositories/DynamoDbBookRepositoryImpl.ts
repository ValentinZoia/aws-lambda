import { BookEntity } from '../../domain/entities/BookEntity';
import { IBook } from '../../domain/entities/BookEntity';
import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export class DynamoDbBookRepositoryImpl implements IBookRepository {
  private readonly tableName: string;
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    this.tableName = process.env.BOOKS_TABLE || 'books-table';
    const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
    this.docClient = DynamoDBDocumentClient.from(client);
  }

  public async create(book: BookEntity): Promise<IBook> {
    const bookData = book.toJSON();
    
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        ...bookData,
        createdAt: bookData.createdAt.toISOString(),
        updatedAt: bookData.updatedAt.toISOString()
      }
    });

    await this.docClient.send(command);
    return bookData;
  }

  public async findById(id: string): Promise<IBook | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id }
    });

    const result = await this.docClient.send(command);
    
    if (!result.Item) {
      return null;
    }

    return {
      ...result.Item,
      createdAt: new Date(result.Item.createdAt),
      updatedAt: new Date(result.Item.updatedAt)
    } as IBook;
  }

  public async findAll(): Promise<IBook[]> {
    const command = new ScanCommand({
      TableName: this.tableName
    });

    const result = await this.docClient.send(command);
    
    return (result.Items || []).map(item => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    })) as IBook[];
  }

  public async update(id: string, book: Partial<IBook>): Promise<IBook> {
    const updateExpression = [];
    const expressionAttributeValues: any = {};
    
    if (book.title) {
      updateExpression.push('title = :title');
      expressionAttributeValues[':title'] = book.title;
    }
    
    if (book.author) {
      updateExpression.push('author = :author');
      expressionAttributeValues[':author'] = book.author;
    }
    
    if (book.publishedYear) {
      updateExpression.push('publishedYear = :publishedYear');
      expressionAttributeValues[':publishedYear'] = book.publishedYear;
    }
    
    updateExpression.push('updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });

    const result = await this.docClient.send(command);
    
    if (!result.Attributes) {
      throw new Error('Book not found');
    }

    return {
      ...result.Attributes,
      createdAt: new Date(result.Attributes.createdAt),
      updatedAt: new Date(result.Attributes.updatedAt)
    } as IBook;
  }

  public async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id }
    });

    await this.docClient.send(command);
  }
}