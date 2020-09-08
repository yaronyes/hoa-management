import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage } from 'mdbreact';
//import './IssueCardEx.css'
import FloatingBtn from '../buttons/FloatingBtn';

const TenantCardEx = ({ tenant, deleteTenant, updateTenant }) => {
    return (
        <MDBCard>
            <MDBCardImage
                className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-3 card-t'
                cascade
                tag='div'
            >
                <h2 className='h2-responsive'>{tenant.name}</h2>
                <p>{new Date(tenant.createdAt).toLocaleString()}</p>
                <div className='text-center'>  
                    <FloatingBtn color='blue' icon='edit' onBtnClicked={() => updateTenant(tenant)}/>    
                    <FloatingBtn color='blue' icon='trash-alt' onBtnClicked={() => deleteTenant(tenant)}/>                                 
                </div>
            </MDBCardImage>            
            <MDBCardBody className='text-left'>            
                <h5><strong>Name: </strong><strong className="text-muted">{tenant.name}</strong></h5>  
                <h5><strong>Email: </strong><strong className="text-muted">{tenant.email}</strong></h5>  
                <h5><strong>Apt: </strong><strong className="text-muted">{tenant.apartment}</strong></h5> 
            </MDBCardBody>
        </MDBCard>
    );
};

export default TenantCardEx;