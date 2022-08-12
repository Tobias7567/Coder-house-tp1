const { response } = require('express')
const express = require('express')
const Conteiner = require("./Conteiner");
const exp = require("constants");

const app = express()
const port = process.env.PORT || 8000


const conteiner = new Conteiner("Trabajo.txt");
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './views')


app.get('/', async (req, res) => {
  let productos = await conteiner.bringAll();
  console.log(productos);
  res.render("index", {
		titulo: "tragos",
		listaProductos: productos,
	
	});
})

app.get('/productos', async (req, res) => {
  try {
    let productos = await conteiner.bringAll();
    console.log(productos);
    res.render("productos", {
      titulo: "tragos",
      listaProductos: productos,
    
    });
  } catch (error) {
    console.log(error)
  }
})

app.post('/productos', async (req, res)=>{
    try {
      const objProducto = req.body;
      conteiner.save(objProducto);
      console.log(objProducto)
      res.redirect('productos')
    } catch (error) {
      console.log(error)
    }
})

const server = app.listen(port, err => {
    if (err) throw new Error(`Error en el servidor: ${err}`)

    console.log(`Server running on port ${server.address().port}`)
})
