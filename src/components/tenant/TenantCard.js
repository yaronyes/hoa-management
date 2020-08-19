import React, { useState } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
    MDBBtn,
    MDBIcon
} from 'mdbreact';
import './TenantCard.css';
import AddUpdateTenant  from './AddUpdateTenant';
import RoundedBtn from '../rounded-button/RoundedBtn';
import { removeTenantUser } from "../../actions/tenantActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardHeader from '../card-header/CardHeader';
import config from '../../config/config.json';

const TenantCard = ({ toggleCollapse, tenant, openID, onUpdateTenant, removeTenantUser }) => {
    const avatar = `${config.server_url}/users/${tenant._id}/avatar?${new Date().getTime()}`;
    //const [modal, setModel] = useState(false);

    // const toggle = () => {
    //     setModel(!modal);
    // }

    //console.log("tenant", tenant)
    //console.log("isopen", isOpen)

    return (
        <div className="tenant-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>
                {/* <div 
                onClick={() => toggleCollapse(tenant._id)}
                className='card-header text-uppercase blue lighten-3 z-depth-1'
                role="tab"
                >
                    <span className='white-text font-weight-bold'>
                        {tenant.name}
                    </span>
                </div> */}
                <CardHeader id={tenant._id} toggleCollapse={toggleCollapse} headerText={tenant.name}/>
                <MDBCollapse id={tenant._id} isOpen={openID === tenant._id ? true : false}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md='3' className='img-col'>
                            <MDBView className='z-depth-1'>
                            <MDBCardImage
                                className='img-fluid z-depth-1'
                                src={avatar}
                                alt=''                                
                            />
                            </MDBView>
                        </MDBCol>
                        <MDBCol md='9' className="data-col">
                            {/* <h2 className='font-weight-bold mb-3 black-text'>
                            Hi! I am the first one.
                            </h2> */}
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Name: </span>{tenant.name}</p>
                                    <p><span className="l-title">Email: </span>{tenant.email}</p>
                                    <p><span className="l-title">Apt: </span>#{tenant.apartment}</p>    
                                </MDBCol>                             
                            </MDBRow>
                            <MDBRow>
                                <MDBCol  md="6" className="offset-md-6">
                                    <div className="btn-group-tenant">      
                                        {/* <MDBBtn rounded color="info" className="btn-rounded" onClick={toggle}>
                                            <MDBIcon icon="user-edit" /> Update
                                        </MDBBtn>
                                        <MDBBtn rounded color="danger" className="btn-rounded">
                                            <MDBIcon icon="trash" /> Delete
                                        </MDBBtn> */}
                                        <RoundedBtn color="info" onClick={() => onUpdateTenant(tenant)} icon="user-edit" caption="Update"/>
                                        <RoundedBtn color="danger" onClick={() => removeTenantUser(tenant)} icon="trash" caption="Delete"/>
                                    </div>    
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
            {/* <AddUpdateTenant modal={modal} toggle={toggle} selectedTenant={tenant}/> */}
        </div>
    );

};

TenantCard.propTypes = {
    errors: PropTypes.object.isRequired,
    //tenant: PropTypes.array.isRequired,
    removeTenantUser: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    errors: state.errors,
    //tenant: state.tenant,
});
  
export default connect(mapStateToProps, { removeTenantUser })(TenantCard);

