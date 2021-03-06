import React, { useState } from 'react';
import { MDBInput, MDBIcon } from 'mdbreact';
import './Options.css';

const Options = ({ onOptionsChanged, value }) => {
    const [options, setOptions] = useState(value && value.length !==0  ? value.map((val, i) =>  ({
        name: `option${i}`,
        value: val
    })) : [
        {
            name: "option0",
            value: ""
        },
        {
            name: "option1",
            value: ""
        }
    ])

    const [iconColor, setIconColor] = useState("");

    const optionChanged = (event) => {
        const newOptions = options.map(option => {
            if(option.name === event.target.name) {
                return {
                    ...option,
                    value: event.target.value
                }
            } else {
                return option;
            }
        });

        onOptionsChanged(newOptions.map(option => option.value));

        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([
            ...options,
            {
                name: `option${options.length}`,
                value: ""
            }
        ]);
    };

    const displayOptions = options.map((option, i) => <MDBInput key={i} type="text" icon="pencil-alt" value={option.value} onChange={optionChanged} name={option.name} required />);

    return (
        <div className="options">
            {displayOptions}
        <div className="add-option">
            <MDBIcon icon="plus" size="2x" onClick={addOption} className={"add-option-icon " + iconColor} onMouseOver={() => setIconColor("blue-text")} onMouseLeave={() => setIconColor("")} /> Add Option            
        </div>
        </div>
    );
};

export default Options;