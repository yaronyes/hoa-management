import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = ({ fullPage = false }) => {
    const style = {
        width: "100%",
        height: fullPage ? "100vh" : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div style={style}>
            <CircularProgress disableShrink className="mx-auto"/>
         </div>
    );
};

export default Spinner;