import Joi from "joi";

const textUser = Joi.extend({
	type: "coercedObject",
	base: Joi.object(),
	coerce: {
		from: "string",
		method(value, helpers) {
			if (
				typeof value !== "string" ||
				(value[0] !== "{" && !/^\s*\{/.test(value))
			) {
				return { value };
			}

			try {
				return { value: JSON.parse(value) };
			} catch (err) {
				return { errors: [helpers.error("object.base")] };
			}
		},
	},
});

export const userPhotoSchema = Joi.object({
	originalname: Joi.string().trim().strict(),
	mimetype: Joi.string().valid(
		"image/jpeg",
		"image/png",
		"imaje/jpeg",
		"image/webp",
	),
	buffer: Joi.binary()
		.required()
		.max(5 * 1024 * 1024),
});

export const createUserSchema = Joi.object({
	user: textUser
		.coercedObject({
			nome: Joi.string().trim().min(3).required().strict(),
			cpf: Joi.string().trim().min(11).max(14).required(),
			email: Joi.string()
				.email({ tlds: { allow: ["com", "net"] } })
				.required(),
			senha: Joi.string()
				.min(8)
				.pattern(
					new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"),
				)
				.required()
				.messages({
					"string.min": "Password must be at least 8 characters long.",
					"string.pattern.base":
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
					"any.required": "Password is required.",
				}),
			endereco: Joi.string().min(10).required(),
			telefone: Joi.string()
				.min(8)
				.max(11)
				.pattern(new RegExp("^[0-9]+$"))
				.required(),
		})
		.required(),
});

export const updateUserSchema = Joi.object({
	email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
	senha: Joi.string()
		.min(8)
		.pattern(
			new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"),
		)
		.messages({
			"string.min": "Password must be at least 8 characters long.",
			"string.pattern.base":
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
			"any.required": "Password is required.",
		}),
	endereco: Joi.string().min(10),
	telefone: Joi.string().min(8).pattern(new RegExp("^[0-9]+$")).max(11),
});
