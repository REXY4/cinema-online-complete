const express = require("express");

const router = express.Router();

//controllers
const {
    register,
    login,
    checkAuth
} = require("../controllers/auth");

//users
const {
    getUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    updatedAvatar
} = require("../controllers/user");


//film
const {
    addFilm, 
    deleteFIlm,
    getFilms,
    changeFilmImage,
    updatedFilm,    
    getFilmDetails,
    getFilmUser,
   /*  getCategory, */
   
} = require("../controllers/film");

//transaction
const { 
    createTransaction,
    approveTransaction,
    getTransactions,
    getTransactionDetail,
    deleteTransaction,
    getTransactionDetailUser
 } = require("../controllers/transaction");

//midlewares
const {
    auth
} = require("../middlewares/auth");
const {
    uploadUser
} = require("../middlewares/uploadUser");
const {
    uploadFilm
} = require("../middlewares/uploadFilm");
const {
    uploadTransaction
} = require("../middlewares/uploadTransaction");


//router

//login & register
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

//users
router.get("/users", auth,  getUsers);
router.get("/user/:id",auth, getUserDetails);
router.patch("/user/:id",auth, updateUser);
router.patch("/avatar/:id", auth, uploadUser("imageFile"), updatedAvatar);
router.delete("/user/:id",  deleteUser);

//film
router.post("/film",  auth,  uploadFilm("imageFile"),  addFilm);
router.delete("/film/:id", auth, deleteFIlm);
router.get("/films",  getFilms);
router.get("/film/:id", auth, getFilmDetails);
router.get("/films/:id", auth, getFilmUser);
router.patch("/thumbnail/:id", auth, uploadFilm("imageFile"), changeFilmImage);
router.patch("/film/:id", auth, updatedFilm);

//transactions
router.post("/transaction/:userId/:filmId", 
auth, 
uploadTransaction("imageFile"), 
createTransaction);

router.patch("/transaction/:id", 
auth, 

approveTransaction);

router.get("/transaction", auth, getTransactions);
router.get("/transaction/:userId/:filmId", auth, getTransactionDetail);
router.get("/transaction/:userId", auth, getTransactionDetailUser);
router.delete("/transaction/:id", auth, deleteTransaction);

/* router.get("/category", getCategory); */

module.exports = router;


   

