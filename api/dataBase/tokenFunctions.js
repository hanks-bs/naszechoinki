import jwt from 'jsonwebtoken';
import {db} from './connection.js';
import dotenv from "dotenv";

dotenv.config();

export const checkToken  =  async (req, res, next) => {
    
   
    try {
        const CookieRefreshToken = req.cookies.jid;

        const status =  jwt.verify(CookieRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(!err) return true;
        })

        const user = jwt.decode(CookieRefreshToken);

        if(!status) return res.sendStatus(403);

       
        const checkRefreshToken = await db('refreshTokens').select('*').where({token: CookieRefreshToken});
        if(!checkRefreshToken[0]) return res.sendStatus(403);

        const User =  db('users').select('*').where('username', user.username)
        .then(response => {
           const UserData = {
               id: response[0].id,
               username: response[0].username,
               email: response[0].email,
               surname: response[0].surname
           }
          const accessToken = generateAccessToken(UserData);
          res.setHeader('Authorization', `Bearer ${accessToken}`);
          res.send(true);
        });
      

    } catch (error) {
        console.log(error)
    }
   
   

}

export const authenticateToken =  async (req, res, next) => {
   
   
    const authHeader = await req.headers['authorization'];
    const CookieRefreshToken = req.cookies.jid;
    const token = authHeader && authHeader.split(' ')[1];

    if(CookieRefreshToken && !token)
    {
       
        try {
            const checkRefreshToken = await db('refreshTokens').select('*').where({token: CookieRefreshToken})
        .then(response =>
            {   
                if(!response[0]) return res.sendStatus(403)
                return true;
            })
           
            if(checkRefreshToken !== true) return res.status(403);

        jwt.verify(CookieRefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
            if(err) return res.sendStatus(403)
            
            const User =   db('users').select('*').where('username', data.username)
            .then(async response => {
               const UserData = {
                   id: response[0].id,
                   username: data.username,
                   email: response[0].email,
                   surname: response[0].surname
               }
              const accessToken = generateAccessToken(UserData);

              const deletingToken = await db('refreshTokens').del().where('token', CookieRefreshToken);
              const refreshToken = await generateRefreshToken(data.username);
              
                res.cookie("jid", refreshToken, {
                  SameSite: true,
                });
              res.setHeader('Authorization', `Bearer ${accessToken}`);
              return next();
            });
        })
        } catch (error) {
            console.log(error);
            return error;
        }
        
    }

    if(token && CookieRefreshToken)
    {
        let error = false;
        try {
           
           
            jwt.verify(CookieRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) {res.sendStatus(403);  error = true;}

            })
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) { res.sendStatus(403);  error = true;}

            })
            if(!error) next();
        } catch (error) {
            console.log(error);
            return res.status(404).json({error: error});
        }
      
    }
}

export const generateAccessToken = (userData) => {
    return  jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
}



export const generateRefreshToken = async (userData) => {
    const token = jwt.sign({username:userData}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
try {
    await db('refreshTokens')
    .insert({
        token: token
    });
    return token;
} catch (error) {
    return console.log(error)
}
   
}