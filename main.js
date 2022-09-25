const { response } = require("express");
const { generadorProductos } = require("./generadorramdomproduct.js");
const exec = require("child_process").exec;
const express = require("express");
const Conteiner = require("./rutas/contenedores/ConteinerArchivo");
const exp = require("constants");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { Router } = express;
const routerProductos = Router();
const productosRandoms = generadorProductos();
const leerComentarios = new Contenedor("./ecomers/mensajes.text");
const guardarComentarios = new Contenedor(
	"./ecomerssinnormalizar.text"
);
const app = express();
const port = process.env.PORT || 4000;
const conteiner = new Conteiner("./ecomers/mensajes.text");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.static("public"));

io.on("connection", async socket => {
	let mensajesChat = await leerComentarios.getAll();
	console.log("Se contectó un usuario");

	const text = {
		text: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", text);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg);
		const text = {
			text: "mensaje nuevo",
			mensajesChat
		};

		io.sockets.emit("mensaje-servidor", text);
		await guardarComentarios.save({
			author: msg.author,
			text: msg.text
		});
		exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
			if (err !== null) {
				console.error(`error de exec: ${err}`);
			}
			return (mensajesChat = await leerComentarios.getAll());
		});
	});
});

app.get("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const productoById = await productos.getById(id);
	productoById
		? res.json(productoById)
		: res.json({ error: "Producto no encontrado" });
});

app.put("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const respuesta = await guardarComentarios.updateById(id, req.body);
	res.json(respuesta);
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.delete("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	res.json(await guardarComentarios.deleteById(id));
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.delete("/api/texts", async (req, res) => {
	res.json(await guardarComentarios.deleteAll());
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.get("/api/productos-test", async (req, res) => {
	const producto = await productosRandoms;
	res.render("productos", {
		list: producto,
		listExist: true,
		producto: true
	});
});

app.get("/", async (req, res) => {
	const producto = await productosRandoms;
	res.render("index", {
		titulo: "Productos de Crud",
		list: producto,
		listExist: true,
		producto: true
	});
});
// ---------------------------- FIN

httpServer.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});


