import { ADD_VOTING, SET_VOTING, EDIT_VOTING, GET_ERRORS } from './types';
import axios from 'axios';
import { getOptions } from '../utils/getAuthToken';
import VotingModel from '../models/VotingModel';

export const setVoting = (voting) => ({
    type: SET_VOTING,
    voting
});

export const addVoting = (voting) => ({
    type: ADD_VOTING,
    voting
});

export const editVoting = (voting) => ({
    type: EDIT_VOTING,
    voting
});

export const createVoting = (voting) => async dispatch => {
    try{
        const response = await axios.post('/voting', voting, getOptions());
        dispatch(addVoting(new VotingModel(response.data)));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const getVoting = () => async dispatch => {
    try{
        const response = await axios.get('/voting', getOptions());
        if(response.data.length !== 0) {
            const voting = response.data.map(item => new VotingModel(item));
            dispatch(setVoting(voting));
        }        
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const updateVoting = (updates, id) => async dispatch =>  {
    try{
        if(Object.keys(updates).length !== 0) {
            const response = await axios.patch(`/voting/${id}`, updates, getOptions());
            dispatch(editVoting(new VotingModel(response.data)));                            
        }       
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const addVote = (vote, id) => async dispatch => {
    try{
        const response = await axios.post(`/vote/${id}`, vote, getOptions());
        dispatch(editVoting(new VotingModel(response.data)));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};