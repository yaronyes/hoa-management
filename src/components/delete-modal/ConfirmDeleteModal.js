import React from 'react';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import RoundedBtn from '../buttons/RoundedBtn';

const ConfirmDeleteModal = ({ toggle, modal, title, onDeleteConfirm }) => {
    return (
        <div>                
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>Deleting {title}</MDBModalHeader>
                <MDBModalBody>
                    Are you sure you want to delete {title} ?
                </MDBModalBody>
                <MDBModalFooter>
                    <RoundedBtn color="info" onClick={toggle} icon="pen" caption="No" size="sm"/> 
                    <RoundedBtn color="danger" onClick={onDeleteConfirm} icon="trash" caption="Yes" size="sm"/>   
                </MDBModalFooter>
            </MDBModal>
        </div>
    );
};

export default ConfirmDeleteModal;