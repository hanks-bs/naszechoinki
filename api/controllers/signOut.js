import SignOutUserService from '../services/SignOutUserService.js'



class SignOut {
    async destroySession(req, res, next) {
       const responseToken = req.cookies.jid;
       if(responseToken)
       {
        const response = await SignOutUserService.DestroySession(responseToken);
        res.clearCookie("jid");
        delete req.headers.authorization;
       
      
       return res.status(200).json({message: "Success signed out!"});;
       
     
       }
        return res.status(403).json("Something wents wrong!");
    }
}
export default new SignOut();