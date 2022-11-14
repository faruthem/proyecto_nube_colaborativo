//Aquí va a correr el servidor
const express = require('express');
const path = require('path'); //Une directorios
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
//inicializaciones de código, contantes
const app = express(); //Lo almacenamos en una constante app

//settings
app.set('port', process.env.PORT || 3000); // process.env.PORT = si existe un puerto en mi servidor, no seas malo y tómalo, si no encuentras un puerto
                                            //toma el local que va a ser el 3000

//Aquí van nuestros archivos html   (handerbals)                                          
app.set('views', path.join(__dirname, 'views'));//Le digo donde están las vistas y concateno con _dirname 

app.engine('.hbs', exphbs({ //Configuramos como vamos a utilizar las vistas con plantillas o diseños
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // dirección para que encuentre layouts / main
    partialsDir: path.join(app.get('views'), 'partials'),// dirección para que encuentre layouts / main/partials
    extname: '.hbs' //Dirección/extensión de mis archivos
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

//Variables globales (poder colocar datos que queremos que estén accesibles desde cualquier parte del server)

//Routes (Marca ls rutas de nuestros archivos)



//Static Files (dirección archivos estáticos)

//Server is listenning (parte de configuración del servidor)
app.listen(app.get('port'), () => {
    console.log('Los hurones están enlazados en el puerto ',app.get('port'));

});//configuramos donde va a estar escuchando nuestro servidor y 
   //configuramos un console.log y requerimos con app.get(port) el puerto al que nos estamos conectando