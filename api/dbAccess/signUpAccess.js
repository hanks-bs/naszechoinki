import {db} from '../dataBase/connection.js';

class UserAccess {
   async createUser(username, password, email) {
       try {
        const emailDb = await db('users')
        .insert({
            username: username,
            password: password,
            email: email,
            surname: 'Kowalski'
        });
       return true
           
       } catch (error) {
           return console.log(error)
       }
    }
}
export default new UserAccess();