//Aquí va a correr el servidor
const express = require('express');
const path = require('path'); //Une directorios
const exphbs = require('express-handlebars'); //Nos permite usar los formatos de handlebars
const methodOverride = require('method-override');
const session = require('express-session'); //Para mis sesiones
const flash = require('connect-flash'); //Esto nos sirve para las alertas
const passport = require('passport');//Esto nos sirve para el login
//inicializaciones de código, constantes
const app = express(); //Lo almacenamos en una constante app
require('./database'); //inicializamos la base de datos <--------- aquí se da el mensaje ji ji ji
require('./config/passport'); //Vamos a utilizar o llamar a nuestra autenticación

//settings
app.set('port', process.env.PORT || 3000); // process.env.PORT = si existe un puerto en mi servidor, no seas malo y tómalo, si no encuentras un puerto
                                            //toma el local que va a ser el 3000
//Aquí van nuestros archivos html   (handerbals)                                          
app.set('views', path.join(__dirname, 'views'));//Le digo donde están las vistas y concateno con _dirname 

app.engine('.hbs', exphbs.engine({ //Configuramos como vamos a utilizar las vistas con plantillas o diseños
    defaultLayout:'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'), // dirección para que encuentre layouts / main
    partialsDir: path.join(app.get('views'), 'partials'),// dirección para que encuentre layouts / main/partials
    extname: '.hbs', //Dirección/extensión de mis archivos
}));//
app.set('view engine', '.hbs');//Configuro motor de las vistas

//Middlewars (funciones que se ejecutan antes de llegar al servidor)
app.use(express.urlencoded({extended: false})) //urlencode = decodifica un formulario (como por ejemplo registros tipo email y contraseña)
app.use(methodOverride('_method'));//Sirve para que los formularios envien otros tipos de metodo, no solo get o post si no también put o delete
app.use(session({                   //con esto autentico al usuario y guardo su session
    secret: 'mininohuron', //Palabra secreta que solo nosotros sabemos, cambio de mysecretapp 
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());//Aquí lo inicializo
app.use(passport.session());//Utilizo la sesion de arriba definida por express
app.use(flash());//Esto es para poder usar flash y poder mandar esas alertas 

//Variables globales (poder colocar datos que queremos que estén accesibles desde cualquier parte del server)
//Variable global que almacena mensajes flash
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');//Para que me muestre los errores del login
    res.locals.user = req.user || null;//Para darle la bienvenida al usuario

    next();
});


//Routes (Marca ls rutas de nuestros archivos y cómo y donde llamarlos)
app.use(require('./routes/index')); //rutas de servidor
app.use(require('./routes/notes')); //rutas de servidor
app.use(require('./routes/users')); //rutas de servidor
app.use(require('./routes/products')); //rutas de servidor
//app.use(require('./pdf')); //ruta de mi PDF


//Static Files (dirección archivos estáticos)
app.use(express.static(path.join(__dirname, 'public'))); // estamos ubicando nuestra carpeta public



//Server is listenning (parte de configuración del servidor)
app.listen(app.get('port'), () => {
    console.log('Los hurones están enlazados en el puerto ',app.get('port'));

});//configuramos donde va a estar escuchando nuestro servidor y 
   //configuramos un console.log y requerimos con app.get(port) el puerto al que nos estamos conectando
