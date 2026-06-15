import Joi from "joi";

export const anuncioPhotosSchema = Joi.array()
	.items(
		Joi.object({
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
		}),
	)
	.min(3)
	.max(7)
	.unique();

export const createAnuncioSchema = Joi.object({
	titulo: Joi.string().trim().min(4).required().strict(),
	descricao: Joi.string().trim().min(10).max(255).strict().required(),
	categoria: Joi.string()
		.valid(
			"Moda e Acessórios",
			"Eletrônicos",
			"Beleza e Cuidados",
			"Casa e decoração",
			"Animais e Acessórios",
		)
		.required(),
	valorDiario: Joi.number().positive().required(),
	caucao: Joi.number().positive().required(),
});
