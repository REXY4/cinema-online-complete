const {User} = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");

exports.register = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const data = req.body;
        const schema = joi.object({
            email : joi.string().email().min(6).required(),
            password : joi.string().min(6).required(),
            fullName  : joi.string().min(6).required()
        });
        //chekc validate
        const {error} = schema.validate(data);
        if(error){
            return res.send({
                status : "Validation Failed",
                message : error.details[0].message
            })
        };
        //validation complete checking;

        //check email
        const checkEmail = await User.findOne({
            where : {
                email
            }
        })
        if(checkEmail){
            res.send({
                status : "Register Failed",
                message : "email is already registered"
            })
        }
        //check email complete;

        //encryption password 
        const hashStrenght = 10;
        const hashedPassword = await bcrypt.hash(password, hashStrenght);
        //encryption password success;

        //token register
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({id : User.id}, secretKey);
        //token register success checking

        //create data
        const dataUser = await User.create({
            ...data,
            password : hashedPassword
        });
        //create data success
        
        res.send({
            status : "success",
            data : {
                user : {
                    dataUser,
                    token
                    }

            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found",
        })
    }
}


exports.login = async (req, res) => {
    try {   
        const {email, password} = req.body;
        
        
        //validate 
        const schema =  joi.object({
            email : joi.string().email().required(),
            password : joi.string().required()
        }); 
        
        const {error} = schema.validate(req.body);  
        
        if(error){
            return  res.send({
                status : "Validation Login Failed",
                message : error.details[0].message
            })
        };
        //validate check complete
        const user = await User.findOne({
            where : {
                email
            }
        });

        //check email
        if(!user){
            return res.send({
                status : "Login failed",
                message : "email and password don't match"
            })
        };
        //check email completeasdsad
        
        //password compare
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(400).send({
                message : "Invalid login"
            })
        }
        //password check complete

        //token user id
        const secretKey = process.env.SECRET_KEY;
        const token = await jwt.sign({id : user.id}, secretKey);
        
                res.send({
                    status : "success",
                    data :  {
                        user : {
                            fullName : user.fullName,
                            email : user.email,
                            token
                        }
                    }
                })
        
        
            } catch (error) {
                res.status(500).send({
                    status : "ERROR",
                    message : "Server Not Found"
                })
            }   
        }
    

        exports.checkAuth = async (req, res) => {
            try {
                const id = req.userId;
        
                const dataUser = await User.findOne({
                    where: {
                        id
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                });
        
                if (!dataUser) {
                    return res.status(404).send({
                        status: "Failed"
                    })
                }
        
                res.send({
                    status: "success",
                    message: "user valid",
                    data: {
                        user: dataUser
                    }
                })
        
            } catch (error) {
                console.log(error);
                res.status(500).send({
                    status: "failed",
                    message: "server error"
                })
            }
        }