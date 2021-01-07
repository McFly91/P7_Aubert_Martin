const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_secret);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        if (req.body.userId && req.body.userId !== userId) {
            return res.status(404).json({ error : "User ID non valide" })
        }
        else {
            res.locals.userId = userId;
            res.locals.role = role;
            next();
        }
    }
    catch {
        res.status(401).json({ error : "Connexion non authorisée" });
    }
};