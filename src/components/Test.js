import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser, loginUser } from '../actions/authActions';
import { addTenantUser, getTenantUsers } from '../actions/tenantActions';
import UserModel from '../models/UserModel';

const Test = ({ createUser, auth, errors, tenant, addTenantUser, getTenantUsers, loginUser  }) => {
    
    useEffect(() => {
        if(auth.isAuthenticated) {
            console.log(auth.user);
        }
    }, [auth]);

    useEffect(() => {
        console.log("Error:", errors);
    }, [errors]);

    useEffect(() => {
        console.log("tenant:", tenant);
    }, [tenant]);

    const addTenant = () => {
        try{         
            const user = new UserModel( {
                name: "tenant tenant",
	            email: "tenant1@test.com",
	            password: "Test1234$",
                apartment: 3
             } );
             addTenantUser(user);                        
        } catch (e) {
            console.log(e)
            alert(e.message)
        }      
    };

    const addUser = () => {
        try{         
            const user = new UserModel( {
                name: "test test",
	            email: "doron4@test.com",
	            password: "Test1234$",
                buildingCommunityName: "the building",
                address: "test address"
             } );
            createUser(user);                        
        } catch (e) {
            console.log(e)
            alert(e.message)
        }      
    };

    return (
        <div>
            <div>
                <button onClick={addUser}>Add User</button>    
            </div>
            <div>
                <button onClick={() => {loginUser({ email: "doron4@test.com", password: "Test1234$" })}}>User Login</button>    
            </div>            
            <div>
                <button onClick={addTenant}>Add Tenant</button>
            </div>
            <div>
                <button onClick={() => getTenantUsers()}>Load Tenants</button>
            </div>
        </div>
    );
}

Test.propTypes = {
    createUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    tenant: PropTypes.array.isRequired,
    addTenantUser: PropTypes.func.isRequired,
    getTenantUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    tenant: state.tenant
});
  
export default connect(mapStateToProps, { createUser, loginUser, addTenantUser, getTenantUsers })(Test);
  