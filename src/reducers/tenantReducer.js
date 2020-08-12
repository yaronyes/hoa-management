import { SET_TENANTS, ADD_TENANT, REMOVE_TENANT, EDIT_TENANT } from '../actions/types';

const initialState =  [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_TENANTS:
            return [
                ...action.tenants
            ];
        case ADD_TENANT:
            return [
                ...state,
                action.tenant
            ];
        case REMOVE_TENANT:
            return state.filter(({ _id }) => _id !== action._id);
        case EDIT_TENANT:
            return state.map(tenant => {
                if(tenant._id === action._id) {
                    return {
                        ...action.tenant
                    }; 
                } else {
                    return tenant;       
                }
            });
        default:
            return state;
    };
};