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
    //res.send('baia baia es mi About poderoso');
    res.render('news.hbs');
});

module.exports = router;
