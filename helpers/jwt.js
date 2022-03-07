const jwt = require('jsonwebtoken');

const generarJWT = (uid, role) => {
    
    return new Promise( (resolve, reject ) => {

        const payload = {
            uid,
            role,
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token ) => {

            if (err) {
                console.log(err);
                reject('No se puedo generar el JWT');
            } else {

                resolve(token);
            }
        });
    

    });
  
}

module.exports = {
    generarJWT,
}
   
