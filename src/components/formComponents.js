// src/form-component/FormInputText.tsx
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

import styled from "@emotion/styled";
import { Button } from "@mui/material";

/**
 * 
 * @param {str} name Key for input
 * @param {str} control Access Form Functionalities
 * @param {str} label Label for input
 * @returns 
 */
function FormInputText ({ name, control, label, type}) {
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
          variant="outlined"
        />
      )}
    />
  );
};

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
    <Button variant="contained" color="success"component="label" role={undefined}>{text}
      <VisuallyHiddenInput
        type="file"
        onChange={onChange}
      />
    </Button>
  )
}

export { FormInputText, FormUploadButton }