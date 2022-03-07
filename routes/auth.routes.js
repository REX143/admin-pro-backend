/**
    Ruta: /api/login
 */
    const { Router } = require('express');
    const { check } = require('express-validator');
    const { validarCampos } = require('../middleware/validar-campos');
    const { login } = require('../controllers/auth.controller');
    
    const router = Router();

    router.post('/',
        [
            check('password','El password es obligatorio').not().isEmpty(),
            check('email', 'Debe ingresar un correo valido').isEmail(),
            validarCampos,
        ],
        login,
    )

    module.exports = router;