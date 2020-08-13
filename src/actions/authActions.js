import { SET_CURRENT_USER, GET_ERRORS } from './types';
import { getOptions } from '../utils/getAuthToken';
import axios from 'axios';
import UserModel from '../models/UserModel';

export const setCurrentUser = user => {
    return {
      type: SET_CURRENT_USER,
      user
    };
};

export const createUser = (user, image) => async dispatch => {
    try{
        const response = await axios.post('/users/committee', user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // if (image) {
        //     try {
        //         await uploadAvatar(image);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
        dispatch(setCurrentUser(new UserModel(response.data.user)));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const loginUser = (userData) => async dispatch => {
    try{
        const response = await axios.post('/users/login', userData)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(setCurrentUser(new UserModel(response.data.user)));
        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const logoutUser = () => async dispatch => {
    try{        
        await axios.post('/users/logout', {}, getOptions());        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(setCurrentUser({}));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
}

export const checkForConnectedUser = () => async dispatch => {
    try{
        const user = localStorage.getItem('user');
        if(localStorage.getItem('token') && user) {
            console.log('connected', JSON.parse(user))
            dispatch(setCurrentUser(new UserModel(JSON.parse(user))));
        } else {
            console.log('not connected')
            //localStorage.removeItem('token');
            //localStorage.removeItem('user');            
        
            dispatch(setCurrentUser({}));
        }                
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
}


