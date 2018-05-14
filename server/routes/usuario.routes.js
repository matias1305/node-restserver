const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario.models');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


const app = express();

// =================================================
// Peticion para obtener los usuarios de la bd.
app.get('/usuario', verificaToken, (req, res) => {

   let desde = req.query.desde || 0;
   desde = Number(desde);

   let limite = req.query.limite || 5;
   limite = Number(limite);

   Usuario.find({ estado: true }, 'nombre email role img estado google')
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {
               if( err ){ // Status 400 en caso de fallar.
                  return res.status(400).json({
                     ok: false,
                     err: err
                  });
               }

               Usuario.count({ estado: true }, (err, conteo) => {
                  res.json({
                     ok: true,
                     usuarios,
                     cuantos: conteo
                  });
               });
            });


});

// =================================================
// Solicitud post para agregar a la bd.
app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {
   let body = req.body;

   // Obteniendo la data
   let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role
   });

   // Guardando en mongoDB
   usuario.save( (err, usuarioDB) => {
      if( err ){ // Status 400 en caso de fallar.
         return res.status(400).json({
            ok: false,
            err: err
         });
      }

      res.json({ // Status 200 en caso de exito.
         ok: true,
         usuario: usuarioDB
      });
   });
});


// ==================================================
// Solicitud put para actualizar a la bd.
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
   let id = req.params.id;
   // Solo envio los datos que pueden ser modificados.
   let body = _.pick(req.body, ['nombre','email','img','role','estado']);

   Usuario.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
      if( err ){ // Status 400 en caso de fallar.
         return res.status(400).json({
            ok: false,
            err: err
         });
      }

      res.json({
         ok: true,
         usuario: usuarioDB
      });
   });

});


// =================================================
// Solicitud delete para borrar un registro a la bd
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
   let id = req.params.id;

   let cambiaEstado = {
      estado: false
   }

   Usuario.findByIdAndUpdate( id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {
      if( err ){ // Status 400 en caso de fallar.
         return res.status(400).json({
            ok: false,
            err: err
         });
      }

      if( !usuarioBorrado ){
         return res.status(400).json({
            ok: false,
            err: {
               message: 'Usuario no econtrado'
            }
         });
      }

      res.json({
         ok: true,
         usuario: usuarioBorrado
      });
   });
});


module.exports = app;
