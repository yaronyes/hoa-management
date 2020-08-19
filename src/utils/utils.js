import axios from 'axios';
import { getOptions } from './getAuthToken';

export const uploadImage = async (url, file, name) => {
    try{
        let data = new FormData();
        data.append(name, file, file.fileName);
        
        const response = await axios.post(url, data, getOptions());       
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}