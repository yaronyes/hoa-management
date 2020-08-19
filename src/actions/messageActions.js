import { ADD_MESSAGE, SET_MESSAGES, EDIT_MESSAGE, REMOVE_MESSAGE, GET_ERRORS } from './types';
import MessageModel from '../models/MessageModel';
import axios from 'axios';
import { getOptions } from '../utils/getAuthToken';

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    messages
});

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message
});

export const editMessage = (message) => ({
    type: EDIT_MESSAGE,
    message
});

export const removeMessage = ({ id }) => ({
    type: REMOVE_MESSAGE,
    id
});


export const createMessage = (message) => async dispatch => {
    try{
        const response = await axios.post('/messages', message, getOptions());
        dispatch(addMessage(new MessageModel(response.data)));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const deleteMessage = ({ _id }) => async dispatch => {
    try{
        const response = await axios.delete(`/messages/${_id}`, getOptions());
        dispatch(removeMessage({ id: response.data._id }));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const getMessages = () => async dispatch => {
    try{
        const response = await axios.get('/messages', getOptions());
        if(response.data.length !== 0) {
            const messages = response.data.map(message => new MessageModel(message));
            dispatch(setMessages(messages));
        }        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const updateMessage = (updates, id) => async dispatch =>  {
    try{        
        if(Object.keys(updates).length !== 0) {
            const response = await axios.patch(`/messages/${id}`, updates, getOptions());
            dispatch(editMessage(new MessageModel(response.data)))
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const addCommentForMessage = (comment, id) => async dispatch =>  {
    try{
        const response = await axios.post(`/comment/message/${id}`, comment, getOptions());
        dispatch(editMessage(new MessageModel(response.data)))                         
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};