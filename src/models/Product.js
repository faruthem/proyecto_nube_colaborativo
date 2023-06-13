const mongoose = require('mongoose');
const { Schema } = mongoose;
//Aquí le estoy diciendo como van a lucier mis datos
//Modelo de datos
const ProductSchema = new Schema({
    title: { type: String, requiered: true },
    description: { type: String, requiered: true },
    precio: { type: Number, default: 0 },
    //user: { type: String },//Esto es para que cada nota se enlace a su usuario
    image: {
        url: { type: String },
        public_id: { type: String } // Campo para almacenar los datos binarios de la imagen
    }
});
//Con esto utilizo mi modelo en otras partes de mi aplicación
module.exports = mongoose.model('Product', ProductSchema)//nombre y ruta