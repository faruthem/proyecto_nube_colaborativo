//Aqui vienene las rutas de mi servidor para que el usuaio pueda crear o manejar sus notas (crear, eliminar, actualizar)
const express = require('express');
const router = express.Router(); // ejecuta método  Router= creación de rutas
//requiero mis esquemas para almacenarlos
const Note = require('../models/Note');

const { isAuthenticated } = require('../helpers/auth');//Revisa si estoy logiado y si no me redirige

//Aquí comienzo a crear mi formulario
router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/new-note');
});
//Aquí termino a crear mi formulario

//ruta para enviar datos
router.post('/notes/new-note',isAuthenticated, async (req,res) => {// agregando async digo que va a ser un proceso asincrono 
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
        newNote.user = req.user._id;//sugerencias enlazadas con cada usuario   //Cambié id por name -- corección por correo
        //console.log(newNote);
        await newNote.save(); // Le agrego away para que se haga asincrono
        req.flash('success_msg','Sugerencia agregada')
        //res.send('Sugerencia enviada y recibida');
        res.redirect('/notes')
    }
    
});
//ruta para enviar datos
router.get('/notes', isAuthenticated,async (req, res) =>{ // Cuidado gente!! estamos frente a un proceso asincrono O.O
        const notes = await Note.find({user: req.user._id}).lean().sort({date: 'desc'});// SE agregó. lean //Se agregó .name para que me pase el nombre por email
        res.render('notes/all-notes', {notes}); // Ve a esa ruta y pasale los datos de notes almacenadas en mi base de datos
         //res.send('Buzón de quejas y sugerencias, su opinión es nuestra mortificación.')// texto que se muestra si la solicitud se realizó con exito
         //res.render('notas')//aquí va a buscar mis notas

 
});
//Ruta para editar mi buzón de sugerencias 
router.get('/notes/edit/:id', isAuthenticated, async (req, res)=>{ //Cambie id por email
    const note = await Note.findById(req.params.id).lean();//Agregué lean para que me mande los datos
    res.render('notes/edit-note',{note});
});

// Ruta de edición de mi buzón de sugerencias por metodo put
router.put('/notes/edit-note/:id', isAuthenticated, async (req,res) => { //Cambie id por email
    const {title,description}= req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description}).lean();//Aquí puse lean, si no sirve lo quitamos
    req.flash('success_msg', 'Sugerencia modificada');
    res.redirect('/notes');
});

// Ruta de eliminación de mi buzón de sugerencias
router.delete('/notes/delete/:id', isAuthenticated, async (req,res) => {
    await Note.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Sugerencia eliminada ');
    res.redirect('/notes');
});
module.exports = router;
