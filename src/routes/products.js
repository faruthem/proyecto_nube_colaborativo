//Aqui vienene las rutas de mi servidor para que el usuaio pueda crear o manejar sus notas (crear, eliminar, actualizar)
const express = require('express');
const router = express.Router(); // ejecuta método  Router= creación de rutas
//requiero mis esquemas para almacenarlos
const Product = require('../models/Product');

const { isAuthenticated } = require('../helpers/auth');//Revisa si estoy logiado y si no me redirige
const User = require('../models/User');
const { db } = require('../models/Product');

//Aquí comienzo a crear mi formulario
router.get('/products/add', isAuthenticated, (req, res) => {
    res.render('products/new-product');
});
//Aquí termino a crear mi formulario

//ruta para enviar datos
router.post('/products/new-product', isAuthenticated, async (req, res) => {// agregando async digo que va a ser un proceso asincrono 
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Por favor escribe un nombre para tu producto' });
    }
    if (!description) {
        errors.push({ text: 'Por favor escribe una descripción para tu producto' });
    }
    if (errors.length > 0) {
        res.render('products/new-product', {
            errors,
            title,
            description
        });
    } else {
        //res.send('Sugerencia enviada');
        const newProduct = new Product({ title, description });
        newProduct.user = req.user._id;//sugerencias enlazadas con cada usuario   //Cambié id por name -- corección por correo
        //console.log(newNote);
        await newProduct.save(); // Le agrego away para que se haga asincrono
        req.flash('success_msg', 'Sugerencia agregada')
        //res.send('Sugerencia enviada y recibida');
        res.redirect('/products')
    }

});
//ruta para enviar datos a comentar
router.get('/products', isAuthenticated, async (req, res) => { // Cuidado gente!! estamos frente a un proceso asincrono O.O
    const products = await Product.find({ user: req.user._id }).lean().sort({ date: 'desc' });// SE agregó. lean //Se agregó .name para que me pase el nombre por email
    res.render('products/all-products', { products }); // Ve a esa ruta y pasale los datos de notes almacenadas en mi base de datos
    //res.send('Buzón de quejas y sugerencias, su opinión es nuestra mortificación.')// texto que se muestra si la solicitud se realizó con exito
    //res.render('notas')//aquí va a buscar mis notas


});
//Ruta para editar mi buzón de sugerencias 
router.get('/products/edit/:id', isAuthenticated, async (req, res) => { //Cambie id por email
    const product = await Product.findById(req.params.id).lean();//Agregué lean para que me mande los datos
    res.render('products/edit-product', { product });
});

// Ruta de edición de mi buzón de sugerencias por metodo put
router.put('/products/edit-product/:id', isAuthenticated, async (req, res) => { //Cambie id por email
    const { title, description } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { title, description }).lean();//Aquí puse lean, si no sirve lo quitamos
    req.flash('success_msg', 'producto agregado');
    res.redirect('/Products');
});

// Ruta de eliminación de mi buzón de sugerencias
router.delete('/products/delete/:id', isAuthenticated, async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Producto eliminado ');
    res.redirect('/products');
});
module.exports = router;