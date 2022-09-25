const { Console } = require("console");
const fs = require("fs");
class Conteiner {
  constructor(ruta) {
    this.ruta = ruta;
  }
async readFileFunction(ruta){
  let data = await fs.promises.readFile(this.ruta, "utf-8");
  let dataParse = JSON.parse(data);
  return dataParse
}
  async save(obj) {
    try {
   let dataParse = await this.readFileFunction(this.ruta)
      if (dataParse.length) {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(
            [...dataParse, { ...obj, id: dataParse[dataParse.length - 1].id + 1 }],
            null,
            2
          )
        );
      } else {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify([{ ...obj, id: dataParse.length + 1 }], null, 2)
        );
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  async updateById(obj) {
    console.log(obj);
    try {
      let dataParse = await this.readFileFunction(this.ruta)
      const objIndex = dataParse.findIndex((prod) => prod.id === obj.id);
      if (objIndex !== -1) {
        dataParse[objIndex] = obj;
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(dataParse, null, 2)
        );
        const actualizado = "el prodcuto fue actualizado";
        return { actualizado };
      } else {
        return { error: "no existe el producto" };
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getById(id) {
    try {
      let dataParse = await this.readFileFunction(this.ruta)
      let producto = dataParse.find((producto) => producto.id === id);
      if (producto) {
        return console.log(producto);
      } else {
        console.log("archivo no encontrado");
      }
    } catch (error) {}
  }
  async getAll() {
    try {
      let dataParse = await this.readFileFunction(this.ruta)
      if (dataParse.length) {
        console.log(dataParse)
        return dataParse;
      } else {
        console.log("el archivo esta vacio");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
    console.log(id)
    try {
      let dataParse = await this.readFileFunction(this.ruta)
      let producto = dataParse.find((producto) => producto.id === id);
      if (producto) {
        const dataParseFilter = dataParse.filter((produc) => produc.id !== id);
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(dataParseFilter, null, 2),
          "utf-8"
        );
        console.log(dataParseFilter);
      } else {
        console.log("archivo no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  }


}
module.exports = Conteiner;