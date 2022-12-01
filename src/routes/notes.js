//Aqui vienene las rutas de mi servidor para que el usuaio pueda crear o manejar sus notas (crear, eliminar, actualizar)

const express = require('express');
const router = express.Router(); // ejecuta método  Router= creación de rutas
//requiero mis esquemas para almacenarlos
const Note = require('../models/Note');


//Aquí comienzo a crear mi formulario
router.get('/notes/add', (req,res)=>{
    res.render('notes/new-note');
})
//Aquí termino a crear mi formulario

//ruta para enviar datos
router.post('/notes/new-note', async (req,res) => {
    const {title, description}=req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Por favor escribe un titulo para tu sugerencia'});
    }
    if(!description) {
        errors.push({text: 'Por favor escribe una descripción para tu sugerencia'});
    }
    if (errors.length>0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }else{
        //res.send('Sugerencia enviada');
        const newNote = new Note({title, description});
        //console.log(newNote);
        await newNote.save();
        //res.send('Sugerencia enviada y recibida');
        res.redirect('/notes')
    }
    
});
//ruta para enviar datos

router.get('/notes', (req, res) =>{
    res.send('Notitas bonitas de la base de datos de los hurones más hermosos todavía')
    //res.render('notas')//aquí va a buscar mis notas
});

module.exports = router;
