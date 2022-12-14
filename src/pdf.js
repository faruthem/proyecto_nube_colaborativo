const mongoose = require('mongoose');
const users = require('./routes/users');//Requerimos usuarios
// RutasWeb.js
const express = require('express');
const router = express.Router();

function PDF() {
    // sentencias
    //Para generar mi archivo PDF
const PDF = require('pdfkit');
const fs = require('fs');
const { post } = require('./routes/users');
var doc = new PDF();
doc.pipe(fs.createWriteStream(__dirname + '/reporte.pdf'));
doc.text("Hola mundo",{
	align:'center'
});
doc.text(users)
doc.end();
console.log('archivo generado');
  }