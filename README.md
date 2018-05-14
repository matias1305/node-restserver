# Login RestServer

- Version: 1.0.0

Recuerde ejecutar el comando
```
npm install
```
## Modelo de usuario
- Nombre    -> String    -> Requerido
- Email     -> String    -> Requerido
- Password  -> String    -> Requerido
- Img       -> String    
- Role      -> String    -> Requerido    -> Default: 'USER_ROLE']
- Estado    -> Boolean   -> Requerido    -> Default: true
- Google    -> Boolean   -> Requerido    -> Default: false

## Peticiones
- GET:           Nos trae todos los usuarios (que no han sido eliminados).
- POST:          Agregamos un usuario a nuestra base de datos.
- PUT:           Actualizamos un usuario (solo los atributos: nombre, email y img).
- DELETE:        Eliminamos LOGICAMENTE un usuario cambiandole su estado a false.
- POST['LOGIN']: Genera un token para para poder acceder a las peticiones.

### Restricciones
- GET:           Token
- POST:          Token y 'ADMIN_ROLE'
- PUT:           Token y 'ADMIN_ROLE'
- DELETE:        Token y 'ADMIN_ROLE'
- POST['LOGIN']: Sin restriccion

Para más informacion visite las siguiente url https://documenter.getpostman.com/view/2447566/cafe-node/RW83PC7S
