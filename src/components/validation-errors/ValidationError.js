import React from 'react';
import './ValidationError.css';

const ValidationError = ({ errorText }) => {
    return (
        <div className="validation-error">
            <div className="invalid-error">
                {errorText}
            </div>
        </div>
    );
};

export default ValidationError;