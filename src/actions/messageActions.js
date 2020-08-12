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

export const removeMessage = (message) => ({
    type: REMOVE_MESSAGE,
    message
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
        const messages = response.data.map(message => new MessageModel(message));
        dispatch(setMessages(messages));
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
        let response;
        if(Object.keys(updates).length != 0) {
            response = await axios.patch(`/messages/${id}`, updates, getOptions());

            if(response)
                dispatch(editTenant(new MessageModel(response.data)))
        }       
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};