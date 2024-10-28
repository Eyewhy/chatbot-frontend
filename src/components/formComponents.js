// src/form-component/FormInputText.tsx
import { Controller } from "react-hook-form";

import { useState } from "react";

import styled from "@emotion/styled";
import { Button, TextField, InputLabel, Select, MenuItem, FormControl, Slider, Typography, Box, Checkbox, ListItemText } from "@mui/material";

/**
 * 
 * @param {str} name Key for input
 * @param {str} control Access Form Functionalities
 * @param {str} label Label for input
 * @returns 
 */
function FormInputText({ name, control, label, type, defaultValue }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          defaultValue={defaultValue}
          variant="outlined"
        />
      )}
    />
  );
};

function FormInputSelect({ name, setOptions, label, options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function handleChange(event) {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    const newValue = (typeof value === 'string' ? value.split(',') : value)

    setSelectedOptions(newValue);
    setOptions(name, newValue);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        value={selectedOptions}
        label={label}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        multiple
      >
        {options.map((option) => {
          return <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.includes(option)}/>
            <ListItemText primary={option}/>
          </MenuItem>
        })}
      </Select>
    </FormControl>
  );
}

function FormInputSlider ({ name, setOptions, label, range, step, valueText }) {
  const [value, setValue] = useState(range[1])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const commitChange = (event, newValue) => {
    (newValue === range[1]) ? setOptions(name, null) : setOptions(name, newValue);
  }

  return (
    <Box sx={{
      width:'100%', 
      height:'100%',
      pt:'4px',
    }}>
      <Box sx={{
        display:'flex',
        justifyContent:'space-between',
      }}>
        <Typography sx={{color:'rgba(0,0,0,0.6)'}}>{label}</Typography>
        <Typography sx={{color:'rgba(0,0,0,0.6)'}}>{valueText(value)}</Typography>
      </Box>
      
      <Box sx={{mx:1}}>
        <Slider
          aria-label={name}
          value={value}
          min={range[0]}
          max={range[1]}
          step={step}
          onChange={handleChange}
          onChangeCommitted={commitChange}
          getAriaValueText={valueText}
          valueLabelDisplay="auto"
        />  
      </Box>
    </Box>
  )
}

function FormUploadButton ( {text, onChange} ) {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Button variant="contained" color="info"component="label" role={undefined}>{text}
      <VisuallyHiddenInput
        type="file"
        onChange={onChange}
      />
    </Button>
  )
}

export { FormInputText, FormInputSelect, FormInputSlider, FormUploadButton }