import { Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {db} from './../dataBase/connection.js';
import {authenticateToken, generateAccessToken, checkToken} from './../dataBase/tokenFunctions.js';
import SignUp from '../controllers/signUp.js';
import SignIn from './../controllers/signIn.js';
import SignOut from '../controllers/signOut.js';



const userRoutes = Router();



userRoutes.delete(['/signout', '/:lang/signout'], SignOut.destroySession)

userRoutes.post(['/api/signup', '/signup'], SignUp.createUser);
userRoutes.get(['/api/signin', '/signin'], SignIn.Authenticate)
userRoutes.post(['/signin','/api/signin'], SignIn.SignInUser);
userRoutes.get('/verifyTokens', checkToken);

userRoutes.get(['/', '/api'], (req, res) => {
  return res.json({text: "Success"});
})

userRoutes.post(["/dashboard", "/:lang/dashboard"], authenticateToken, async (req, res) => {
res.json("Success");
})

userRoutes.get(["/users", "/api/users"],authenticateToken , async (req, res) => {
  try {
    const Users = await db('users').select('*').then(users => {
      res.json(users);
  });
  } catch (error) {
    console.log(error);
    return error;
  }
  
});



export default userRoutes;