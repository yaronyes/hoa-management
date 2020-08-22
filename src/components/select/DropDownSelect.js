import React, {useState} from 'react';
import { Select, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MDBIcon } from 'mdbreact';
import './DropDownSelect.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const DropDownSelect = ({onChange, dropDownItems, label, icon}) => {
    const [value, setValue] = useState("");
    const classes = useStyles();
    
    const valueChanged = event => {
        onChange(event.target.value);

        setValue(event.target.value);
    };

    const dropDownItemsList = dropDownItems.map((item, i) => <option key={i} value={item.value}>{item.name}</option>);

    return (
        <div className="drop-down-select">
            <MDBIcon icon={icon} className="drop-down-select-ico" size="2x"/>
            <FormControl className={classes.formControl}>                                
                
                <InputLabel htmlFor="dd-select">{label}</InputLabel>
                <Select
                native
                value={value}
                onChange={valueChanged}
                inputProps={{
                    name: 'dd-select',
                    id: 'dd-select',
                }}
                >
                <option aria-label="None" value="" />
                {dropDownItemsList}
                {/* <option value="urgent">urgent</option>
                <option value="important">important</option>
                <option value="normal">normal</option> */}
                </Select>
            </FormControl>
        </div>
    );
};

export default DropDownSelect;