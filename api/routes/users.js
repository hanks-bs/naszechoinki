import { Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {db} from './../dataBase/connection.js';
import {authenticateToken, generateAccessToken, checkToken} from './../dataBase/tokenFunctions.js';
import SignUp from '../controllers/signUp.js';
import SignIn from './../controllers/signIn.js';
import SignOut from '../controllers/signOut.js';
import Seedlings from '../controllers/seedlings.js';
import multer from 'multer';

const upload = multer();
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

userRoutes.get(["/api/seedlings_items", "/get/seedlings_items"], Seedlings.Items_Get);
userRoutes.get(["/api/seedlings_items/:id", "/seedlings_items/:id"], Seedlings.SingleItem_Get);
userRoutes.post(["/api/seedlings_items", "/seedlings_items"],upload.single('image'),authenticateToken, Seedlings.Items_Upload);
userRoutes.put(["/api/seedlings_items/:id", "/seedlings_items/:id"],authenticateToken, Seedlings.Items_Update);
userRoutes.delete(["/api/seedlings_items/:id", "/seedlings_items/:id"],authenticateToken, Seedlings.Items_Delete);


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