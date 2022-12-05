const mongoose = require('mongoose');
const {Schema} = mongoose;
//Importo modulo bcryp
const bcrypt= require('bcryptjs');

//Aquí guardamos la información que nos pasa signup
const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

//Aquí encriptamos nuestra contraseña
UserSchema.methods.encryptPassword = async (password) =>{// llamo mi esquema.methods.nombre del metodo = contraseña
  const salt = await bcrypt.genSalt(10);//la ciframos mediante bcryptjs ¿cómo? pues de forma bien asyncrona, replico 10 veces.
  return await bcrypt.hash(password,salt);//Genero contraseña cifrada
};

//Comparamos la contraseña encriptada, la que está guardada con la que está en la base de datos, chupale pichón
UserSchema.methods.matchPassword = async function(password) {//esquema.methods.nombre del metodo = contraseña
  return await bcrypt.compare(password, this.password);// no utilizo función flecha para poder acceder a las propiedades fuera de la función
};
module.exports = mongoose.model('User',UserSchema);//Nombre del esquema en servidor y nombre de mi esquema en node.js 

