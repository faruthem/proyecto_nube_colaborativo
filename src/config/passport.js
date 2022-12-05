//Esta parte es para poder guardar sessiones
const passport = require('passport');//Para autenticar usuarios
const LocalStrategy = require('passport-local').Strategy;//Autenticación de modo local
//PAra poder consultar con base de datos
const User = require ('../models/User');
//
passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done ) => {
  const user = await User.findOne({email: email });
  if(!user){
    return done(null, false, {message: 'Usuario no encontrado'});//Mensaje por si el usuario no es encontrado
  } else {
    const match = await user.matchPassword(password);//Modulo de la instancia de la clase
    if (match) {
        return done(null, user);//Null para el error y usuario para el dato
    } else {
        return done(null, false, {message: 'Contraseña incorrecta'});
    }
  }
}));
//Para almacenar el usuario en una sección
passport.serializeUser((user, done) => {
    done(null, user.id);
});
//tomamos un ID y generamos un usuario yeee
passport.deserializeUser((id, done) =>{ //Si existe la sessión del usuario buscalo cuando lo encuentras retornalo
   User.findById(id, (err, user) => {
    done(err, user);//Usamos un Id y traemos los datos del usuario
   });
});