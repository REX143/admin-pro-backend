// Importando modelo
const Usuario = require('../model/usuario.model');
// Importando objeto response para manejar respuestas
const { response } = require('../model/usuario.model');
// Para encriptación de contraseñas
const bcrypt = require('bcryptjs');
// Para generar el JWT
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,  

    });
    
}
const creartUsuarios = async (req, res= response) => {
    
    const {email, password, nombre} = req.body;

      try {
        
        const existeMail = await Usuario.findOne({email});
        if (existeMail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado.'
            });
        }

        const usuario = new Usuario (req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar el TOKEN -JWT
        const token = await generarJWT( usuario.id, usuario.role );

        res.json({
            ok: true,
            msg:'Creando usuario',
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar logs'
        });
    }
    

}

const actualizarUsuario = async (req, res= response) =>{

    const uid= req.params.id;


    try {

        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }
        
        // Actualización
        const { password,google,email, ...campos} = req.body;

        if (usuarioDB.email !== email) {
                  
            const existeMail = await Usuario.findOne({ email });
            if (existeMail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email.'
                });
            }
        }

        campos.email = email;        
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true});

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async(req, res=response)=>{
    const uid= req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg: 'Usuario eliminado.'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }


}

module.exports = {getUsuarios, creartUsuarios, actualizarUsuario, borrarUsuario};