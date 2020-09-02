import React from 'react';
import { useHistory } from "react-router-dom";

const NotificationToast = ( { text, redirectTo } ) => {
    const history = useHistory();

    return (
        <div onClick={() => history.push(redirectTo)}>
            {text}
        </div>
    );
};

export default NotificationToast;