import {db} from './../dataBase/connection.js';
import {generateAccessToken, generateRefreshToken} from './../dataBase/tokenFunctions.js';


class signInAccess {
    async SendAccessToken(ToDelToken, username, toRefresh) 
    {
        const User = await db('users').select('*').where('username', username)
                        .then(response => {
                            return response[0];
                        });
        const accessToken =  generateAccessToken(User)
        if(toRefresh)
        {
            const deletingToken = await db('refreshTokens').del().where('token', ToDelToken);
            const refreshToken = await generateRefreshToken(username);
            return {accessToken, refreshToken, toRefresh};
        }

        return {accessToken};
    }
   async generateTokens(Userdata) {
    const accessToken =  generateAccessToken(Userdata)
    const refreshToken =  await generateRefreshToken(Userdata.username)

    return {accessToken, refreshToken};

    }
}
export default new signInAccess();