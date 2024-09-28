import { z } from "zod"; // Import Zod for schema validation

// Schema for creating a note
export const createTaskSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    description: z
      .string()
      .min(4, { message: "Descrition must be greater than 4 characters!" }),
  }),
});

// Schema for updating a note
export const updateTaskSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      description: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" }),
    })
    .partial(),
});
