//Conexión a una base de datos
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kevinFerret:AWVW4H1BPBBFUFQL@clusterfinalnube.hyapnsf.mongodb.net/test', { //aquí estamos haciendo nuestra configuración con mongoose
//mongoose.connect('mongodb://localhost:27017/CRUD', {
         //const db = await connect("mongodb://localhost/crud");
        //mongoose.connect("mongodb://localhost:27017/CRUD");

    //useCreateIndex: true,
    //useNewUrlParser: true,
    //useFindAndModify: false,
})
    .then(db => console.log('BD creada por hurones conectada y armadita'))
    .catch(err => console.error(err));