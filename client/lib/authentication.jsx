import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from "js-cookie";


export const authenticate = async function () {
    const refreshToken = Cookies.get('jid');
    try {

      if(!refreshToken) return this.setState({userdata: false});
      const response = await axios.get(`http://${window.location.hostname}:5000/signin`, {withCredentials: true});
      const token =  response.headers.authorization.split(' ')[1];

      this.setState({userdata: jwt.decode(token)});
    } catch (error) {
      this.setState({userdata: false});
      return error;
    }
}