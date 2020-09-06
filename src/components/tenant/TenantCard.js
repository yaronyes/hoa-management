import React from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
} from 'mdbreact';
import './TenantCard.css';
import RoundedBtn from '../rounded-button/RoundedBtn';
import { removeTenantUser } from "../../actions/tenantActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardHeader from '../card-header/CardHeader';
import config from '../../config/config.json';

const TenantCard = ({ toggleCollapse, tenant, openID, onUpdateTenant, removeTenantUser }) => {
    const avatar = `${config.server_url}/users/${tenant._id}/avatar?${new Date().getTime()}`;
    
    return (
        <div className="tenant-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>
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
                        <MDBCol md='5' className="data-col">
                            <h5><strong>Name: </strong><strong className="text-muted">{tenant.name}</strong></h5>  
                            <h5><strong>Email: </strong><strong className="text-muted">{tenant.email}</strong></h5>  
                            <h5><strong>Apt: </strong><strong className="text-muted">{tenant.apartment}</strong></h5>      
                        </MDBCol>                             
                        <MDBCol  md="4" className="btn-col h-100 mt-auto">                            
                                <RoundedBtn color="info" onClick={() => onUpdateTenant(tenant)} icon="user-edit" caption="Update" size="sm"/>
                                <RoundedBtn color="danger" onClick={() => removeTenantUser(tenant)} icon="trash" caption="Delete" size="sm"/>
                        </MDBCol>                                                                                    
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
        </div>
    );

};

TenantCard.propTypes = {
    errors: PropTypes.object.isRequired,
    removeTenantUser: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
    errors: state.errors,
});
  
export default connect(mapStateToProps, { removeTenantUser })(TenantCard);

