import { SET_TENANTS, ADD_TENANT, REMOVE_TENANT, EDIT_TENANT, GET_ERRORS } from './types';
import axios from 'axios';
import { getOptions } from '../utils/getAuthToken';
import UserModel from '../models/UserModel';

export const setTenants = (tenants = []) => ({
    type: SET_TENANTS,
    tenants
});

export const addTenant = (tenant = {}) => ({
    type: ADD_TENANT,
    tenant
});

export const removeTenant = ({ id }) => ({
    type: REMOVE_TENANT,
    id
});

export const editTenant = (tenant) => ({
    type: EDIT_TENANT,
    tenant
});

export const addTenantUser = (tenant) => async dispatch => {
    try{
        const response = await axios.post('/users/tenant', tenant, getOptions());
        dispatch(addTenant(new UserModel(response.data)));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const removeTenantUser = ({ _id }) => async dispatch => {
    try{
        const response = await axios.delete(`/users/tenant/${_id}`, getOptions());
        dispatch(removeTenant({ id: response.data._id }));
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const getTenantUsers = () => async dispatch => {
    try{
        const response = await axios.get('/users/tenants', getOptions());
        if(response.data.length !== 0) {
            const tenants = response.data.map(user => new UserModel(user));
            dispatch(setTenants(tenants));
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};

export const updateTenantUser = (updates, id) => async dispatch =>  {
    try{
        if(Object.keys(updates).length !== 0) {
            const response = await axios.patch(`/users/tenant/${id}`, updates, getOptions());           
            console.log(response)
            dispatch(editTenant(new UserModel(response.data)))
        }       
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e
        })
    }
};