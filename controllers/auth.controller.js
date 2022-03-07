const { response } = require('../model/usuario.model');
const Usuario = require('../model/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res=response) => {

    const { email, password } = req.body;

    try {
        // Verificar existencia de email
        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no válido...'
            });
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync( password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        // Generar el TOKEN -JWT
        const token = await generarJWT( usuarioDB.id, usuarioDB.role );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'En este momento no esta disponible el acceso, hable con el adminitrador de sistemas'
        })
    }
}

module.exports = {login};