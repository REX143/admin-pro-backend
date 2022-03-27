/*
    Medicos
    ruta: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medico.controller');
const { validarJWT } = require('../middleware/validar-jwt');
/*********************************************************************************************************/

const router = Router();

router.get('/', getMedicos );
router.post('/', 
[
    validarJWT,
    check('nombre','El nombre del médico es necesario.').not().isEmpty(),
    check('hospital','El id del hospital debe ser válido.').isMongoId(),
    validarCampos
],
crearMedico );

router.put('/:id', 
[],
 actualizarMedico);

 router.delete('/:id', borrarMedico);



module.exports = router;