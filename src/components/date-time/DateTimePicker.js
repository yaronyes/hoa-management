import React, { useState } from 'react';
import { MDBIcon } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './DateTimePicker.css';
import dateFormat from 'dateformat';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 220,
    },
  }));
  
const DateTimePicker = ({ label, onDateTimeChanged, value }) => {
    const classes = useStyles();
    const [dateTime, setDateTime] = useState(value ? value : dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM")) 

    const dateTimeChanged = (event) => {                    
      onDateTimeChanged(event.target.value);
      
      setDateTime(event.target.value);
    }

    return (
        <div className="date-time-picker">
            <MDBIcon icon="calendar-alt" className="date-time-picker-ico" size="2x"/>            
                <TextField
                    id="datetime-local"
                    label={label ? label : "End Date"}
                    type="datetime-local"
                    value={dateTime}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={dateTimeChanged}
                />
        </div>
    );
};

export default DateTimePicker;