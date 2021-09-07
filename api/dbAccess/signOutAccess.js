import {db} from '../dataBase/connection.js';
import jwt from 'jsonwebtoken';

class signOutAccess {
   async SignOutUser(refreshToken) {
        const emailDb = await db('refreshTokens').del().where('token', refreshToken);
       return true
    }
}
export default new signOutAccess();