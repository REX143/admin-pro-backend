/**
    Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getUsuarios,creartUsuarios,actualizarUsuario, borrarUsuario } = require('../controllers/usuario.controller');
const { validarJWT } = require('../middleware/validar-jwt');
/*********************************************************************************************************/

const router = Router();

router.get('/', validarJWT, getUsuarios );
router.post('/', 
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'Debe ingresar un correo valido').isEmail(),
    validarCampos,
],
creartUsuarios );

router.put('/:id', 
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
],
 actualizarUsuario);

 router.delete('/:id', 
[
    check('id','Debe enviar el id del usuario').not().isEmpty(),
    validarJWT,
    validarCampos,
],
 borrarUsuario);



module.exports = router;