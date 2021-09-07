import signUpAccess from '../dbAccess/signUpAccess.js'
import {db} from '../dataBase/connection.js';
import bcrypt from 'bcrypt';


class signUpService {
        async validateEmail(email) {
            try {
                const User =  await db('users').select('email').where('email', email);
                if(User[0])
                return true;
            } catch (error) {
                return console.error(error);
            }
           

         
    }
       async validateUserName(userName) {
           try {
            const User =  await db('users').select('username').where('username', userName);
            if(User[0])
                 return true;
           } catch (error) {
            return console.error(error);
           }
          


    }
    async createUser(UserData)
    {
        let errors = {};

        const {username, email, password, passwordRepeat} = UserData;
        //Validacja//
        if(await this.validateUserName(username)) errors.usernameExist = true;
        if(await this.validateEmail(email)) errors.emailExist = true;
         
        if(Object.keys(errors).length) 
        {
           return errors;
        }
        try {
            const passwordHash = await bcrypt.hash(password, 10);
            console.log(passwordHash);
            return signUpAccess.createUser(username,passwordHash, email);
        }catch(err) {
            console.log(err);
        }
       

    }
}

export default new signUpService();