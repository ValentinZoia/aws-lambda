import { DIContainer } from '../DIContainer';
import { GetBookByIdQuery } from '../../../application/queries/GetBookByIdQuery';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const getBookByIdHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Book ID is required' })
      };
    }

    const getBookByIdQuery = DIContainer.getGetBookByIdQuery();
    const book = await getBookByIdQuery.execute(id);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        success: true,
        data: book.toJSON()
      })
    };

  } catch (error) {
    console.error('Error getting book:', error);
    
    if (error instanceof Error && error.message.includes('not found')) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          error: error.message
        })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};