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

export const generateRandomColor = () => "#"+(((1+Math.random())*(1<<24)|0).toString(16)).substr(-6);

export const compareByDate = (a, b) => new Date(a) - new Date(b);

export const compareByPriority = (a, b, priorities) => priorities[a] - priorities[b];