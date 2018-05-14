# Login RestServer

- Version: 1.0.0

Recuerde ejecutar el comando
```
npm install
```
## Modelo de usuario


| Atributos | Tipo de dato | Requerido | Default   |
| :-------- | :----------- | :-------: | :-------: |
| Nombre | String | Si | - |
| Email | String | Si | - |
| Password | String | Si | - |
| Img | String | No | - | - |
| Role | String | Si | 'USER_ROLE' |
| Estado | Boolean | Si | true |
| Google | Boolean | Si | false |

## Peticiones
| Peticion | Descripcion |
| :------- | :---------- |
| GET | Nos trae todos los usuarios (que no han sido eliminados). |
| POST | Agregamos un usuario a nuestra base de datos. |
| PUT | Actualizamos un usuario (solo los atributos: nombre, email y img). |
| DELETE | Eliminamos LOGICAMENTE un usuario cambiandole su estado a false. |
| POST['LOGIN'] | Genera un token para para poder acceder a las peticiones. |


### Restricciones
| Peticion | Token | 'ADMIN_ROLE' |
| :------- | :---: | :----------: |
| GET | Si | No |
| POST | Si | Si |
| PUT | Si | Si |
| DELETE | Si | Si |
| POST['LOGIN'] | No | No |

Para más informacion visite la siguiente url https://documenter.getpostman.com/view/2447566/cafe-node/RW83PC7S
