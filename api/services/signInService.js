import bcrypt from 'bcrypt';
import {db} from '../dataBase/connection.js';
import signInAccess from './../dbAccess/signInAccess.js'
import jwt from 'jsonwebtoken';


class SignInUserService {
    tokenDbStatus = true;
    toRefresh = false;
    async Authenticate(toCheckToken) {
        this.tokenDbStatus = true;
        this.toRefresh = false;
        const TokenVal = jwt.verify(toCheckToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) return err;

            return {username: data.username};
        });
        if (!TokenVal.username) return  {errors: "Invalid token"};

        const TokenStatus = await db('refreshTokens').select('*').where({
            token: toCheckToken
        })
        .then(response => {
            if (!response[0]) return this.tokenDbStatus = false;
              return this.tokenDbStatus = true;
        })
        if(!this.tokenDbStatus)return {errors: "No token in database"}; //No token in database

        const userStatus = db('users').select('username').where({
            username: TokenVal
        }).then(response => {
            if (!response[0]) return false;
            return true;
        })

        if(!userStatus) return {errors: "No username in database"}; //No username in database

        //
        const data = jwt.decode(toCheckToken);
        const now =   new Date().getTime();
        const date =  new Date(data.exp * 1000).getTime();
        var timeDiff = Math.abs(now - date);
        var diffSeconds = Math.ceil(timeDiff / (1000));  //second
       
       if(diffSeconds <= 604620){this.toRefresh = true} 
        //

        return signInAccess.SendAccessToken(toCheckToken, TokenVal.username, this.toRefresh);

    }
    async validatepassword(PasswordStored, password) {

        const match = await bcrypt.compare(password, PasswordStored);
        return match;
    }
    async SignInUser(UserData) {
        let errors = {};
        const {
            login,
            password
        } = UserData;
        const User = await db('users').select('*').where('email', login).orWhere('username', login).then(res => {

            if (res[0]) return res[0]
            else {
                errors.loginNotExist = true;
                return false;
            }

        });
        if (!User) return {errors};

        if (!await this.validatepassword(User.password, password)) {
            errors.inValidPassword = true;
            return {
                errors
            };
        }

        return signInAccess.generateTokens(User);


    }
}

export default new SignInUserService();