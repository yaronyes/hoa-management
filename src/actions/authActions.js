import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from './types';
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
    try {
        const response = await axios.post('/users/committee', user);
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

export const loginUser = (userData) => async dispatch => {
    try {
        const response = await axios.post('/users/login', userData)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(setCurrentUser(new UserModel(response.data.user)));
        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e.response
        })
    }
};

export const logoutUser = () => async dispatch => {
    try {        
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
    try {
        const user = localStorage.getItem('user');
        if(localStorage.getItem('token') && user) {            
            dispatch(setCurrentUser(new UserModel(JSON.parse(user))));
        } else {
            console.log('not connected')
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


export const updateUser = (updates) => async dispatch =>  {
    try {
        if(Object.keys(updates).length !== 0) {
            const response = await axios.patch('/users/current', updates, getOptions());                                   
            localStorage.setItem('user', JSON.stringify(response.data));        
            dispatch(setCurrentUser(new UserModel(response.data)));
        }       
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS });
