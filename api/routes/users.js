import { Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {db} from './../dataBase/connection.js';
import {authenticateToken, generateAccessToken, checkToken} from './../dataBase/tokenFunctions.js';
import SignUp from '../controllers/signUp.js';
import SignIn from './../controllers/signIn.js';
import SignOut from '../controllers/signOut.js';
import Seedlings from '../controllers/seedlings.js';
import Pricelist from '../controllers/pricelist.js';
import PlantNursery from '../controllers/plantnursery.js';
import multer from 'multer';

const max_size = 5242880; // 5 mb

const max_size_10mb = 10485760; // 10 mb

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../client/public/uploads/images')
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
}
})

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../client/public/uploads/download_files')
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
}
})
const upload = multer({storage: storage, limits: max_size});
const uploadFiles = multer({storage: fileStorage, limits: max_size_10mb});

const userRoutes = Router();



userRoutes.delete(['/signout', '/:lang/signout'], SignOut.destroySession)

userRoutes.post(['/api/signup', '/signup'], authenticateToken, SignUp.createUser);
userRoutes.get(['/api/signin', '/signin'], SignIn.Authenticate)
userRoutes.post(['/signin','/api/signin'], SignIn.SignInUser);
userRoutes.get('/verifyTokens', checkToken);

userRoutes.get(['/', '/api'], (req, res) => {
  return res.json({text: "Success"});
})

//Seedlings
userRoutes.get(["/api/seedlings", "/seedlings"], Seedlings.Get);

userRoutes.get(["/api/seedlings_items", "/seedlings_items"], Seedlings.Items_Get);
userRoutes.get(["/api/seedlings_items/:id", "/seedlings_items/:id"], Seedlings.SingleItem_Get);
userRoutes.post(["/api/seedlings_items", "/seedlings_items"],upload.single('image'),authenticateToken, Seedlings.Items_Upload);
userRoutes.put(["/api/seedlings_items/:id", "/seedlings_items/:id"], upload.single('image'), authenticateToken, Seedlings.Items_Update);
userRoutes.delete(["/api/seedlings_items/:id", "/seedlings_items/:id"],authenticateToken, Seedlings.Items_Delete);

userRoutes.post(["/api/seedlings_items/contact", "/seedlings_items/contact"], Seedlings.Contact);

//Pricelist
userRoutes.get(["/api/pricelist_items", "/pricelist_items"], Pricelist.GetItems);
userRoutes.get(["/api/pricelist_items/:id", "/pricelist_items/:id"], Pricelist.SingleItem_Get);
userRoutes.delete(["/api/pricelist_items/:id", "/pricelist_items/:id"],authenticateToken, Pricelist.DeleteItem);
userRoutes.post(["/api/pricelist_items/", "/pricelist_items/"], upload.single('image'),authenticateToken, Pricelist.AddItem);
userRoutes.put(["/api/pricelist_items/:id", "/pricelist_items/:id"], upload.single('image'), authenticateToken,Pricelist.Items_Update);

//PlantNursery
userRoutes.get(["/api/plantnursery_items", "/plantnursery_items"], PlantNursery.GetItems);
userRoutes.get(["/api/plantnursery_items/:id", "/plantnursery_items/:id"], PlantNursery.SingleItem_Get);
userRoutes.delete(["/api/plantnursery_items/:id", "/plantnursery_items/:id"],authenticateToken, PlantNursery.DeleteItem);
userRoutes.post(["/api/plantnursery_items/", "/plantnursery_items/"], upload.single('image'),authenticateToken, PlantNursery.AddItem);
userRoutes.put(["/api/plantnursery_items/:id", "/plantnursery_items/:id"], upload.single('image'), authenticateToken,PlantNursery.Items_Update);

userRoutes.get(["/api/files_download", "/files_download"], PlantNursery.GetFiles);
userRoutes.post(["/api/files_download/", "/files_download/"], uploadFiles.single('file'),authenticateToken, PlantNursery.AddFile);
userRoutes.delete(["/api/files_download/:id", "/files_download/:id"], authenticateToken, PlantNursery.RemoveFile);




userRoutes.get(["/users", "/api/users"],authenticateToken , async (req, res) => {
  try {
    const Users = await db('users').select('*').then(users => {
      res.json(users);
  });
  } catch (error) {
    return error;
  }
  
});



export default userRoutes;