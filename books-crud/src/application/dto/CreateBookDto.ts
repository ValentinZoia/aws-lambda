import { z } from "zod";

export const CreateBookSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title too long"),
    author: z
        .string()
        .min(1, "Author is required")
        .max(100, "Author name too long"),
    isbn: z.string().regex(/^\d{13}$|^\d{10}$/, "Invalid ISBN format"),
    publishedYear: z.number().min(1000).max(new Date().getFullYear()),
});

export type CreateBookDTO = z.infer<typeof CreateBookSchema>;

export class CreateBookDto {
    private constructor(
        public title: string,
        public author: string,
        public isbn: string,
        public publishedYear: number,
    ) {}

    static create(data: unknown): CreateBookDto {
        const validationResult = CreateBookSchema.safeParse(data);

        if (!validationResult.success) {
            throw new Error("Validation failed");
            // return {
            //       statusCode: 400,
            //       body: JSON.stringify({
            //           error: "Validation failed",
            //           details: validationResult.error.errors,
            //       }),
            //   };
        }

        const parsedData = validationResult.data;

        const { title, author, isbn, publishedYear } = parsedData;

        //--------Validaciones de negocio----------

        return new CreateBookDto(title, author, isbn, publishedYear);
    }
}
