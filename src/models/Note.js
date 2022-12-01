const mongoose = require ('mongoose');
const { Schema } = mongoose;
//Aquí le estoy diciendo como van a lucier mis datos

const NoteSchema = new Schema ({
    title: {type: String, requiered: true},
    description: { type: String, requiered: true},
    date: {type: Date, default: Date.now}
});

//Con esto utilizo mi modelo en otras partes de mi aplicación
module.exports = mongoose.model('Note', NoteSchema)//nombre y ruta