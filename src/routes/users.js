//Usuario puede acceder a las URL para autenticarse login,logout, register,
const express = require('express');
//const passport = require('passport');
const router = express.Router(); // ejecuta método  Router= creación de rutas

const User = require('../models/User'); // importo mi esquema de usuarios YUJU!!
const passport = require('passport'); // importamos para poder usar estrategy de autentication


router.get('/users/signin', (req, res)=>{// esto sirve para que el usuario ingrese a la aplicación 
    res.render('users/signin'); //Con render lo envio ya de mi ruta y con send lo muestro, es un simple texto
});

//Lo de arriba es solo para poder ver mi modelo y llamarlo ahora lo voy a llamar con el método post
router.post('/users/signin',passport.authenticate('local', {
    successRedirect: '/notes',//Si todo sale bien ¿ a dónde lo redirecciono?
    failureRedirect: '/users/signin', //Si sale mal pues me lo mandas aquí
    failureFlash: true
})); //local = la manera en que se va a autenticar el usuario

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});
//Vamos a crear otra ruta para el registro (signup para los gringos)
router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password} = req.body;
    const errors = [];
    //console.log(req.body)// Recuerda quitar este para no ver los datos despues
    if (name.length <=0) {
        errors.push({text: 'Por favor inserta un nombre'});
    }
    if (email.length <=0) {
        errors.push({text: 'Por favor inserta un correo'});
    }
    if (password.length <=0) {
        errors.push({text: 'Por favor inserta una contraseña'});
    }
    if (password != confirm_password) {//Aquí es para ver si mi contraseña es igual con la otra :D
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if (password.length < 4) {//La contraseña debe tener más de 4 caracteres
        errors.push({text: 'La contraseña debe tener más de 4 caracteres '})
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password}); //Si los errores son mayores a 0 entonces 
    }else{
        const emailUser = await User.findOne({email: email}); //en caso de correo duplicado aquí estoy papá
        if (emailUser) {
            req.flash('error_msg','ADVERTENCIA, el correo ya está registrado');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});//Creo objeto llamado newUser
        newUser.password = await newUser.encryptPassword(password);//almaceno propiedad de objeto como password
        await newUser.save();//Aquí es donde ocurre la magia, aquí enviamos todos esos datos recolectados a nuestro esquema, lo que permite guardarlos en nuestra base de datos 
        req.flash('success_msg', 'Registro exitoso');
        res.redirect('/users/signin');
    }
});// como se piden por distintos métodos no hay problema con el de arriba :D
module.exports = router;
