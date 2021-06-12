const {User} = require("../../models");

exports.getUsers = async (req, res)=>{
    try {
        const checkUser = await User.findOne({
            ...req.body
        });
        if(!checkUser){
            return res.send({
                status : "failed",
                message : "data not found"
            })
        }
        res.send({
            status : "success",
            user : {
                id : checkUser.id,
                email : checkUser.email,
                fullName :checkUser.fullName,
                avatar : checkUser.avatar,
                phone : checkUser.phone,
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message  : "server not found",
        })
    }
}

exports.getUserDetails = async (req, res) =>{
    try {
        const {id} = req.params;
        const getUsers = await User.findOne({
            where : {id},

            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        });
        if(!getUsers){
            return res.send({
                status : "failed",
                message : "user not found",
            })
        }
        res.send({
            status : "success",
            data : {
            user : getUsers
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found",
        })
    }
}

exports.updateUser = async (req, res)=>{
    
    try {
        const {id}= req.params;
        const checkUser = await User.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt","password"]
            }
        });
        if(!checkUser){
            return res.send({
                status : "failed",
                message : "user not found"
            })
        }
      
        const updateData = {
            ...req.body,
        }
            

      
        await User.update(updateData,{
            where : {id},
        })

        res.send({
            status : "success",
            user : updateData,
        })

    } catch (error) {
        res.status(404).send({
            status : "error",
            message  : "server not found"
        })
    }
}

exports.updatedAvatar = async (req, res)=>{
    try {
        const {id}= req.params;
        const checkUser = await User.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt","password"]
            }
        });
        if(!checkUser){
            return res.send({
                status : "failed",
                message : "user not found"
            })
        }
        const image = req.files.imageFile[0].filename;
        const patch = process.env.PATH_KEY_USER;
        const updateData = {
            ...req.body,
            avatar : patch + image,
        }
        await User.update(updateData,{
            where : {id},
        })
            
        res.send({
            status : "success",
            user : updateData,
        })

    } catch (error) {
        res.status(404).send({
            status : "error",
            message  : "server not found"
        })
    }
}


exports.deleteUser = async (req, res) =>{
    try {
        const { id } = req.params;
        const checkUser = await User.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        });
        if(!checkUser){
            return res.send({
                status : 'failed',
                message : "user not found"
            })
        };

       await User.destroy({
           where : {id}
       })
        res.send({
            status : "success",
            user  : checkUser.id
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found"
        })
    }
}
