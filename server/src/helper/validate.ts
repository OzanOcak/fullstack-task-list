import { NextFunction, Request, Response } from "express"; // Import Express types
import { AnyZodObject } from "zod"; // Import Zod for validation

// Middleware for validating request data against a schema
const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate the request body, query, and params
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next(); // Proceed to the next middleware/controller
    } catch (err: any) {
      const error_message = JSON.parse(err.message);
      return res.status(400).json({
        status: "Bad Request!",
        message: error_message[0].message, // Send validation error message
      });
    }
  };

export default validate;
