import axios from 'axios';


export const verifyTokens = async () => {
    try {
        const response = await axios.get(`http://${window.location.hostname}:5000/verifyTokens`, {withCredentials: true});
        return response.data
    } catch (error) {
        return error;
    }
}