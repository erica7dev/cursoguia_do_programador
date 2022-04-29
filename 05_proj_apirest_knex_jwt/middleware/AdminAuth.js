const jwt = require("jsonwebtoken");
const secret = require("../secrets/secret");

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' '); //divide token 
        const token = bearer[1]; //pr. pos do array

        try{
            const decoded = jwt.verify(token,secret);
            
            if(decoded.role == 1){ //se verificação for true
                next();
            }else{
                res.status(403);
                res.send("Você não tem permissão para isso!");
                return;
            }
        }catch(err){
            res.status(403);
            res.send("Você não está autenticado");
            return;
        }
    }else{
        res.status(403);
        res.send("Você não está autenticado");
        return;
    }
}