import Joi from "joi";

export const pagamentoSchema = Joi.object({
	anuncioId: Joi.string().required().length(36),
	dataInicio: Joi.date().iso().greater("now").required(),
	dataFim: Joi.date().iso().greater(Joi.ref("dataInicio")).required(),
	valorTotal: Joi.number().positive().required(),
	caucao: Joi.number().positive().required(),
});
