import { DIContainer } from "../DIContainer";
import { CreateBookDto } from "../../../application/dto/CreateBookDto";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const createBookHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Request body is required" }),
            };
        }

        // Parse and validate input
        const rawData = JSON.parse(event.body);
        const createBookDto = CreateBookDto.create(rawData);

        const createBookCommand = DIContainer.getCreateBookCommand();
        const book = await createBookCommand.execute(createBookDto);

        return {
            statusCode: 201,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                success: true,
                data: book.toJSON(),
            }),
        };
    } catch (error) {
        console.error("Error creating book:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Internal server error",
            }),
        };
    }
};
