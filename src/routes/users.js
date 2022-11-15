//Usuario puede acceder a las URL para autenticarse login,logout, register,

const express = require('express');
const router = express.Router(); // ejecuta método  Router= creación de rutas

router.get('/users/signin', (req, res)=>{
    res.render('users/signin.hbs') //Con render lo envio ya de mi ruta y con send lo muestro, es un simple texto
});

router.get('/users/signup', (req, res) =>{
    //res.send('form of authentication of ferrets');
    res.render('users/signup.hbs')
});

module.exports = router;
