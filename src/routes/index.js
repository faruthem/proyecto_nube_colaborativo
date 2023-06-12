//Aquí van las URL de mi página principal, ejemplo /about
const express = require('express');
const router = express.Router(); // ejecuta método  Router= creación de rutas

router.get('/', (req, res) => {
    //res.send('pero si es el Index de la muerte que no se puede subir a Heroku');
    res.render('index.hbs');
});

router.get('/about', (req, res) => {
    //res.send('baia baia es mi About poderoso');
    res.render('about.hbs');
});

router.get('/news', (req, res) => {
    //res.send('baia baia es mi news poderoso');
    res.render('news.hbs');
});

router.get('/artesanal', (req, res) => {
    //res.send('baia baia es mi artesanal poderoso');
    res.render('artesanal.hbs');
});

router.get('/tienda', (req, res) => {
    //res.send('baia baia es mi artesanal poderoso');
    res.render('tienda.hbs');
});

router.get('/mexicana', (req, res) => {
    //res.send('baia baia es mi artesanal poderoso');
    res.render('mexicana.hbs');
});

router.get('/datos', (req, res) => {
    //res.send('baia baia es mi artesanal poderoso');
    res.render('datos.hbs');
});

//Imagenes
module.exports = router;
