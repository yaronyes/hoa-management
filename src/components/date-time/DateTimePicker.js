import React from 'react';
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

const DateTimePicker = () => {
    const classes = useStyles();

    const now = new Date();
    //alert(dateFormat(now, "yyyy-mm-ddTh:MM"))

    return (
        <div className="date-time-picker">
            <MDBIcon icon="calendar-alt" className="date-time-picker-ico" size="2x"/>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue={dateFormat(now, "yyyy-mm-dd'T'HH:MM")}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
        </div>
    );
};

export default DateTimePicker;