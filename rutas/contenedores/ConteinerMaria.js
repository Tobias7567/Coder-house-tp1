const { Console } = require("console");
const fs = require("fs");
const { options } = require("./mariaDB/conextionDB");
const knex = require("knex")(options);
class Conteiner {
  async crearTabla() {
    try {
      await knex.schema.createTable("productos", (table) => {
        table.increments("id");
        table.string("nombre");
        table.string("url");
        table.string("precio");
        table.string("hora");
        table.string("seccion");
        table.string("activo");
      });
    } catch (error) {
      console.log(error);
    }
  }
  async save(obj) {
    try {
      await knex("productos").insert({
        nombre: obj.nombre,
        precio: obj.precio,
        url: obj.url,
        hora: obj.hora ,
        seccion: obj.seccion ,
        activo : "true"
      });
      return console.log("guardado con  exito");
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let rows = await knex().from("productos").select("*").where('activo', '=',"true")
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  async updateById(obj) {
    try {
   await knex.from('productos').where('id', obj.id ).update({
    nombre: obj.nombre,
    precio: obj.precio,
    url: obj.url,
    hora: obj.hora ,
    })
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
 
    try {
   await  knex.from("productos").where('id','=' , id).update({
       activo : "false"
    })
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Conteiner;
