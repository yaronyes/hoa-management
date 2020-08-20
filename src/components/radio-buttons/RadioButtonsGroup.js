import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './RadioButtonsGroup.css';

export default function RadioButtonsGroup({ label, radioBtnInfo, defaultSelect, onChange, isHorizontal=true }) {
  const [value, setValue] = React.useState(defaultSelect);

  const handleChange = (event) => {
    onChange(event.target.value);

    setValue(event.target.value);
  };

  const displayBtns = radioBtnInfo.map((btn, i) => <FormControlLabel key={i} value={btn.value} control={<Radio />} label={btn.label} />)

  return (
    <div className="radio-group-btn">
      <FormLabel htmlFor="radio-group" className="group-label">{label}</FormLabel>
      <RadioGroup aria-label={label} id="radio-group" value={value} onChange={handleChange} row={isHorizontal}>
        {displayBtns}
      </RadioGroup>
    </div>
  );
}
