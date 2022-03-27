const fs = require('fs');

const Usuario = require('../model/usuario.model');
const Medico = require('../model/medico.model');
const Hospital = require('../model/hospital.model');

const borrarImagen = (path)=>{

    if (fs.existsSync( path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }

}

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
              if (!medico) {
                console.error('No existe el médico con el id enviado...')
                return false;
             }

            const pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

           break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
              console.error('No existe el hospital con el id enviado...')
              return false;
           }

          const pathViejoHosp = `./uploads/hospitales/${ hospital.img }`;
          borrarImagen(pathViejoHosp);
          
          hospital.img = nombreArchivo;
          await hospital.save();
          return true;

            
            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
              console.error('No existe el usuario con el id enviado...')
              return false;
           }

          const pathViejoUser = `./uploads/usuarios/${ usuario.img }`;
          borrarImagen(pathViejoUser);
          
          usuario.img = nombreArchivo;
          await usuario.save();
          return true;

            
            break;
    
        
    }
} 

module.exports = { actualizarImagen }