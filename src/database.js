//Conexión a una base de datos
const mongoose = require('mongoose');
//mongodb+srv://usuario:faustorifa@clusterfinalnube.hyapnsf.mongodb.net/ferretDB
mongoose.connect('mongodb+srv://usuario:faustorifa@clusterfinalnube.hyapnsf.mongodb.net/ferretDB', { //aquí estamos haciendo nuestra configuración con mongoose
})
    .then(db => console.log('BD creada por hurones conectada y armadita'))
    .catch(err => console.error(err));