const { normalize, denormalize, schema } = require("normalizr");
const fs = require("fs");
const mensajesSinNormalizar = require("./mensajesSinNormalizar.json");


const messages = mensajesSinNormalizar;

const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const commentSchema = new schema.Entity("text");
const messageSchema = [
	{
		author: authorSchema,
		text: commentSchema
	}
];

const normalizedMessages = normalize(messages, messageSchema);


fs.writeFileSync(
	"./ecommerce/mensajes.text",
	JSON.stringify(normalizedMessages.result)
);