const mongoose = require ('mongoose');
const { Schema } = mongoose;
//Aquí le estoy diciendo como van a lucier mis datos
//Modelo de datos
const ProductSchema = new Schema ({
    title: {type: String, requiered: true},
    description: { type: String, requiered: true},
    date: {type: Date, default: Date.now},
    user: {type: String}//Esto es para que cada nota se enlace a su usuario
});

//Con esto utilizo mi modelo en otras partes de mi aplicación
module.exports = mongoose.model('Product', ProductSchema)//nombre y ruta