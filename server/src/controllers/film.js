const { 
    Film, 
    User,
    Category, 
    CategoryFilm,
    Transaction
 } = require("../../models");
 



exports.addFilm = async (req, res)=>{
    const {
        title : filmTitle, 
        price, 
        category : categoryName, 
        userId,
        
     } = req.body;
    try {
     
        const patch = process.env.PATH_KEY_FILM;
        const image = req.files.imageFile[0].filename;
        const product = await Film.create({
            ...req.body,
            title : filmTitle,
            price,
            userId,
            thumbnail :patch + image
         });
          const category = await Category.findOne({
            where: {
              name : categoryName
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
          });
    
          if(category) {
            product.setCategories(category);
          } else {
            product.createCategory({name : categoryName});
          }
        res.send({
            status : "success",
            data : {
                product
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found"
        })
    }
}



exports.deleteFIlm = async (req, res) =>{
    try {
        const {id} = req.params;
        const checkFilm = await Film.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        });
        if(!checkFilm){
            return res.send({
                status : 'failed',
                message : "data not found"
            })
        };
        await Film.destroy({
            where : {id}
        });
        res.send({
            status : "success",
            film : checkFilm
        })
    } catch (error) {
        res.status(404).send({
            status : 'error',
            message : "server not found",
        })
    }
}

exports.getFilms = async (req, res) =>{
    try {
        const getFilm  = await Film.findAll({
            include : [
                {
                    model : User,
                    as : "user",
                    attributes : {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model : Category,
                    as : "categories",
                    throught :{
                        model : CategoryFilm,
                        as : "conjunction",
                        attributes : {
                         
                        }
                        
                    },
                    attributes : {
                        exclude : ["createdAt", "updatedAt"]
                    }    

                },
                {
                    model : Transaction,
                    as : "transactions",
                    attributes : {
                        exclude : ["updatedAt", "createdAt"]
                    }
                }
            ],
            attributes :{
                exclude : ["createdAt", "updatedAt"]
            }
        });
        res.send({
            status : "success",
            data :{
               film : getFilm
            } 
        })
    } catch (error) {
        res.status(404).send({
            status : 'error',
            message : "server not found",
        })
    }
}

exports.getFilmDetails = async (req, res) =>{
    const {id} = req.params;
    try {
        const getFilm  = await Film.findAll({
            where : {id},
            include : [
                {
                    model : User,
                    as : "user",
                    attributes : {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model : Category,
                    as : "categories",
                    throught :{
                        model : CategoryFilm,
                        as : "conjunction",
                        attributes : {
                         
                        }
                        
                    },
                    attributes : {
                        exclude : ["createdAt", "updatedAt"]
                    }    

                },
                {
                    model : Transaction,
                    as : "transactions",
                    attributes : {
                        exclude : ["createdAt", "updatedAt"]
                    }
                   }
            ],
            attributes :{
                exclude : ["createdAt", "updatedAt"]
            }
        });
        if(!getFilm){
            res.send({
                status : "failed",
                message : "data not found"
            })
        }
        res.send({
            status : "success",
            data :{
               film : getFilm
            } 
        })
    } catch (error) {
        res.status(404).send({
            status : 'error',
            message : "server not found",
        })
    }
}



exports.getFilmUser = async (req, res) =>{
    const {id} = req.params;
    try {
        const getFilm  = await Film.findAll({
            where : {userId : id},
            include : [
                {
                    model : User,
                    as : "user",
                    attributes : {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model : Category,
                    as : "categories",
                    throught :{
                        model : CategoryFilm,
                        as : "conjunction",
                        attributes : {
                         
                        }
                        
                    },
                    attributes : {
                        exclude : ["createdAt", "updatedAt"]
                    }    

                },
                {
                    model : Transaction,
                    as : "transactions",
                    attributes : {
                        exclude : ["createdAt", "updatedAt"]
                    }
                   }
            ],
            attributes :{
                exclude : ["createdAt", "updatedAt"]
            }
        });
        if(!getFilm){
            res.send({
                status : "failed",
                message : "data not found"
            })
        }
        res.send({
            status : "success",
            data :{
               film : getFilm
            } 
        })
    } catch (error) {
        res.status(404).send({
            status : 'error',
            message : "server not found",
        })
    }
}



exports.changeFilmImage = async (req, res)=>{
    const {id} = req.params;  
    try {
        const checkFilm = await Film.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        })
        if(!checkFilm){
            res.send({
                status : "failed",
                message : "data not found"
            })
        }
        
        const patch = process.env.PATH_KEY_FILM;
        const image = req.files.imageFile[0].filename;
        const film = {
            ...req.body,
            thumbnail :patch + image
        }
        const product = await Film.update(film,{
            where : {id}
        });
           

        res.send({
            status : "success",
            data : {
                product
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found"
        })
    }
}


exports.updatedFilm = async (req, res)=>{
    const {id} = req.params; 
    const {
        title : filmTitle, 
        price, 
        category : categoryName, 
        userId,
    } = req.body; 
        
    try {
        const checkFilm = await Film.findOne({
            where : {id},
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        })
        if(!checkFilm){
            res.send({
                status : "failed",
                message : "data not found"
            })
        }
        
       
        const film = {
            ...req.body,
            title : filmTitle,
            price,
            userId,
        }
            
        const product = await Film.update(film,{
            where : {id},
        });
           
            

       const category = await Category.findOne({
            where: {
              name : categoryName
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
          });
          
          if(!category){
                 checkFilm.createCategory({
                    name : categoryName
                })    
            }else{
                checkFilm.setCategories(category)
            }
                
        res.send({
            status : "success",
            data : {
                film : product
            }
        })
    } catch (error) {
        res.status(404).send({
            status : "error",
            message : "server not found"
        })
    }
}