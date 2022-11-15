//Aqui vienene las rutas de mi servidor para que el usuaio pueda crear o manejar sus notas (crear, eliminar, actualizar)

const express = require('express');
const router = express.Router(); // ejecuta método  Router= creación de rutas

router.get('/notes', (req, res) =>{
    res.send('Notitas bonitas de la base de datos de los hurones más hermosos todavía')
    //res.render('notas')//aquí va a buscar mis notas
});

module.exports = router;
