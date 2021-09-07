import signUpService from './../services/signUpService.js'

class SignUp {
    async createUser(req, res) {
        try {
            const response = await signUpService.createUser(req.body);
            
            res.status(201).json(response);
        }catch(err) {
            console.error(err);
            res.status(500).json('Something went wrong');
        }
    }
}
export default new SignUp();