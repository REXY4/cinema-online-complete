const { Transaction, Film, User} = require("../../models");
const joi = require("joi");

exports.createTransaction = async (req, res) =>{
    const {userId, filmId} = req.params;
    try {
        const patch = process.env.PATH_KEY_TRANSACTION;
        const image = req.files.imageFile[0].filename;
        const addTransaction = {
           ...req.body,
            transferProof :patch + image,
            status : "Pending",
        }
     
        const transactions = await Transaction.create(addTransaction,{
            
            filmId : {filmId},
            userId : {userId},
        });
           
         res.send({
             status : "success",
             data : {
                 transaction : transactions
             }
         })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found"
        })
    }
}

exports.approveTransaction = async (req, res)=>{
    const {id} = req.params;
    try {
        const chekcTransactions = await Transaction.findOne({
            where : {id}
        });
        if(!chekcTransactions){
            return res.send({
                status : "failed",
                message : "data not found",
            })
        };
      
        const transactions = {
            ...req.body,
        }
        await Transaction.update(transactions,{
            where : {id}
        })
        res.send({
            status : "success",
            data : {
                transaction : transactions
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : 'server not found'
        })
    }
}



exports.getTransactions = async (req, res) =>{
    try {
        const getTransactions  = await Transaction.findAll({
            include : [
                {
                    model : User,
                    as : "user",
                    attributes : {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model : Film,
                    as : "films",
                    attributes : {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                        
                    
                },

            ],
            attributes :{
                exclude : ["createdAt", "updatedAt"]
            }
        });
        res.send({
            status : "success",
            data :{
               transaction : getTransactions
            } 
        })
    } catch (error) {
        res.status(404).send({
            status : 'error',
            message : "server not found",
        })
    }
}


exports.getTransactionDetail = async (req, res) =>{
        const {userId, filmId } = req.params;
    try {
        const getTransactions  = await Transaction.findOne({
            where : {userId , filmId},
            include : [
                {
                    model : User,
                    as : "user",
                    attributes : {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model : Film,
                    as : "films",
                    attributes : {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }         
                },
            ],
            attributes :{
                exclude : ["createdAt", "updatedAt"]
            }
        });
        res.send({
            status : "success",
            data :{
               transaction : getTransactions
            } 
        })
    } catch (error) {
        res.status(404).send({
            status : 'error',
            message : "server not found",
        })
    }
}

exports.getTransactionDetailUser = async (req, res) =>{
    const {userId } = req.params;
try {
    const getTransactions  = await Transaction.findAll({
        where : {userId},
        include : [
            {
                model : User,
                as : "user",
                attributes : {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            },
            {
                model : Film,
                as : "films",
                attributes : {
                    exclude: ["createdAt", "updatedAt", "password"]
                }         
            },
        ],
        attributes :{
            exclude : ["createdAt", "updatedAt"]
        }
    });
    res.send({
        status : "success",
        data :{
           transaction : getTransactions
        } 
    })
} catch (error) {
    res.status(404).send({
        status : 'error',
        message : "server not found",
    })
}
}


exports.deleteTransaction = async (req, res)=>{
    const {id} = req.params;
    try {
        const checkTransactions = await Transaction.findOne({
            where : {id}
        });
        if(!checkTransactions){
            return res.send({
                status : "failed",
                message : "data not found",
            })
        };
        await Transaction.destroy({
            where : {id}
        })
      
       
        res.send({
            status : "success",
            data : {
                transaction : checkTransactions
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : 'server not found'
        })
    }
}
