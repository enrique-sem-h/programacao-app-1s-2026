import type { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

interface ValidationSchema {
	body?: Joi.ObjectSchema;
	file?: Joi.ObjectSchema;
	files?: Joi.ArraySchema;
}

export default function validate(schema: ValidationSchema): RequestHandler {
	return (req: Request, res: Response, next: NextFunction) => {
		const errors: Joi.ValidationErrorItem[] = [];

		const validationOptions: Joi.ValidationOptions = {
			abortEarly: false,
			stripUnknown: true,
			allowUnknown: false,
		};

		if (schema.body) {
			const { error, value } = schema.body.validate(
				req.body,
				validationOptions,
			);
			if (error) errors.push(...error.details);
			else req.body = value;
		}

		if (schema.file) {
			const { error, value } = schema.file.validate(
				req.file,
				validationOptions,
			);
			if (error) errors.push(...error.details);
			else req.file = value;
		}

		if (schema.files) {
			const { error, value } = schema.files.validate(
				req.files,
				validationOptions,
			);
			if (error) errors.push(...error.details);
			else req.files = value;
		}

		if (errors.length > 0) {
			return res.status(400).json({
				status: "fail",
				errors: errors.map((err) => ({
					field: err.path.join("."),
					message: err.message,
				})),
			});
		}
		next();
	};
}
