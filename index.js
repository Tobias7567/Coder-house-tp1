class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascotas(mascotas) {
    this.mascotas.push(mascotas);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({
      nombre,
      autor,
    });
  }
  getBookName() {
    return this.libros.map((libro) => libro.nombre);
  }
}

const usuario = new Usuario(
  "Tobias",
  "Vaschchuk",
  [{ nombre: "Los juegos del hambre", autor: "Suzanne Collins" }],
  ["juano", "luca"]
);

console.log("El nombre del usuario es", usuario.getFullName());
console.log("agregando mascota", usuario.addMascotas("pedro"));
console.log(
  "la cantidad de mascotas que tiene usuario es ",
  usuario.countMascotas()
);
usuario.addBook("sinsajo", "Suzanne Collins");
console.log(usuario.libros);
console.log(usuario.getBookName());
