const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.models');

const app = express();

app.post('/login', (req, res) => {
   let body = req.body;

   Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
      if( err ){ // Status 400 en caso de fallar.
         return res.status(500).json({
            ok: false,
            err: err
         });
      }

      if( !usuarioDB ){
         return res.status(400).json({
            ok: false,
            err: {
               message: "(Usuario) y/o contraseña incorrectos"
            }
         });
      }

      if(!bcrypt.compareSync(body.password, usuarioDB.password)){
         return res.status(400).json({
            ok: false,
            err: {
               message: "Usuario y/o (contraseña) incorrectos"
            }
         });
      }

      let token = jwt.sign({
         usuario: usuarioDB
      }, process.env.SEDD, { expiresIn: process.env.CADUCIDAD_TOKEN });

      res.json({
         ok: true,
         usuario: usuarioDB,
         token
      });
   });
});

module.exports = app;
