import axios from 'axios';
import axiosInstance from './axios';

export const verifyTokens = async () => {
    try {
        const response = await axiosInstance.get(`/api/verifyTokens`, {withCredentials: true});
        return response.data
    } catch (error) {
        return error;
    }
}