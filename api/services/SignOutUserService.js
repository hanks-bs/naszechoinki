import bcrypt from 'bcrypt';
import {db} from '../dataBase/connection.js';
import signOutAccess from './../dbAccess/signOutAccess.js'
import jwt from 'jsonwebtoken';


class SignOutUserService {
    async validateToken (token) {
        const validateStatus = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return validateStatus;
    }
    async DestroySession(refreshToken) {
        let errors = {};
        const token = refreshToken;
        if(!this.validateToken) return {errors: ['No token in database']}
        const Exists = await db('refreshTokens').select('token').where('token', refreshToken).then(res => {

            if (res[0]) return true
            else {
                return false;
            }

        });
        if (!Exists) return {errors: ['No token in database.']};


        return signOutAccess.SignOutUser(refreshToken);


    }
}

export default new SignOutUserService();