const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        let token = header && header.replace("Bearer ", "");

        if (!token) {
            return res.send({
                status: "Failed",
                message: "Access Denied"
            })
        };

        const secretKey = process.env.SECRET_KEY;

        const verified = jwt.verify(token, secretKey);

        req.userId = verified.id;

        next();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}