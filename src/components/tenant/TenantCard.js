import React, { useState } from 'react';
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
import RoundedBtn from '../buttons/RoundedBtn';
import { removeTenantUser } from "../../actions/tenantActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardHeader from '../card-header/CardHeader';
import config from '../../config/config.json';
import TenantCardEx from './TenantCardEx';
import ConfirmDeleteModal from '../delete-modal/ConfirmDeleteModal';

// component for rendering tenant card for accordion
// Props:
// toggleCollapse -function - for toggle the card
// tenant: object - UserModel class.the tenant that the card represents
// openID: string - indicate the card id to toggle. if the openID === tenant._id, the card is open
// onUpdateTenant - function - callback function for updating tenant in the parent
// cardMode - boolean - indicate if to render the card shape component instead of the accordion
// redux connect props:
// removeTenantUser: redux function for deleting tenant
// auth - redux object represent the logged-in user
const TenantCard = ({ toggleCollapse, tenant, openID, onUpdateTenant, removeTenantUser, cardMode }) => {
    const [confirmModal, setConfirmModal] = useState(false); 
    const avatar = `${config.server_url}/users/${tenant._id}/avatar?${new Date().getTime()}`;

    const toggleConfirmModal = () => setConfirmModal(!confirmModal);

    const onDeleteTenant = () => {        
        toggleConfirmModal();
    }
    
    return (
        <div className="tenant-card">
            { !cardMode
            ? <MDBCard style={{ backgroundColor: 'transparent' }}>
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
                                <RoundedBtn color="danger" onClick={onDeleteTenant} icon="trash" caption="Delete" size="sm"/>
                        </MDBCol>                                                                                    
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
            : <TenantCardEx tenant={tenant} deleteTenant={onDeleteTenant} updateTenant={onUpdateTenant} /> }
            <ConfirmDeleteModal toggle={toggleConfirmModal} modal={confirmModal} title={tenant.name} onDeleteConfirm={() => removeTenantUser(tenant)}/>
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

