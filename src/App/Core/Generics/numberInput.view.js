import React from 'react';
import PropTypes from 'prop-types';
import {
    TextField
} from '@material-ui/core';
import NumberFormat from 'react-number-format';


const NumberFormatCustom = props => {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  
NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const NumberInput = props => {

    const {value, handleChange, label} = props;

    return <TextField
                style={{marginTop: '8px', marginBottom: '4px', width: '100%', border: 0,
                  display: "inline-flex",
                  padding: 0,
                  position: "relative",
                  minWidth: 0,
                  flexDirection: "column",
                  verticalAlign: "top"
                }}
                label={label}
                value={value}
                onChange={handleChange}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
            />;

}

NumberInput.propTypes = {
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string
}

export {NumberInput};