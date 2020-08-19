import React, {useState} from 'react';
import { MDBIcon, MDBBadge, MDBCol, MDBInput, MDBAlert, MDBRow } from 'mdbreact';
import { Grid, TextField } from '@material-ui/core';
import './LoadImage.css';

const LoadImage = ({ fileCallback }) => {
    //const [value, setValue] = useState("");
    const [showError, setShowError] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const handleFile = (e) => {    
        //e.preventDefault(); 
        console.log(e.target.files, "$$$")
        console.log(e.target.files[0], "$$$")       
        const file = e.target.files[0]
        
        //setValue(file.name);

        if (file != null && file.size > 1000000) {
            return setShowError(true);           
        }else {
            setShowError(false);
        }

        fileCallback(file);
        
        let reader = new FileReader();
        
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }
    
        reader.readAsDataURL(file);                
    }

    
        const imagePreview = imagePreviewUrl ? <img src={imagePreviewUrl} width="250" height="250" alt=""/> : <div className="previewText">Please select an Image for Preview</div>

        const alertDialog = showError ? <MDBAlert color="danger">Image size is too large. Please use smaller image</MDBAlert > : null;
        

    return (
        // <div className="load-image">
        //     <MDBRow>
        //         <MDBCol nd="4">
        //             <MDBIcon icon="file-upload" className="load-image-ico"/>
        //             <TextField id="load-image-with-icon-grid" label="Load Image" type="file"/>
        //         </MDBCol>

        //     </MDBRow>
        // </div>
        <div className="load-image">        
            <MDBRow>
                <MDBCol>
                    <label htmlFor="file-input">                 
                        <div className="upload-icon">
                            {/* <MDBIcon icon="upload" size="3x"/>       */}
                            <h5><MDBBadge color="grey lighten-1" className="load-badge"><MDBIcon icon="file-upload" className="mr-3"/>LOAD IMAGE</MDBBadge></h5>
                        </div>                                                
                    </label>
                    <input id="file-input" type="file" accept="image/*" onChange={handleFile} />
                    {/* <MDBInput
                            label="Choose File"
                            // icon="file-upload"                           
                            type="text"
                            value={value}                                                                                  
                            />             */}
                </MDBCol>   
            </MDBRow>
            <MDBRow>
                <div className="imgPreview">
                    {imagePreview}
                </div>
                <div>
                    {alertDialog}
                </div>                      
            </MDBRow>                                                                      
        </div>
    );
}

export default LoadImage;