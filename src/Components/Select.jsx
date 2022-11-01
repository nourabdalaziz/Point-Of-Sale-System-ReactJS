import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError.jsx";
import "./Components_Styles/form.css";

function Select({ label, name, options, ...rest }) {
  return (
    <div className="main-input-container">
      <div className="input-container">
        <label htmlFor={name} className="fieldslabel">
          {label}
        </label>
        <Field
          as="select"
          id={name}
          name={name}
          {...rest}
          className="select-field"
        >
          <option value="" className="select-option">
          </option>
          {options.map((option) => {
            return (
              <option
                key={option.value}
                value={option.value}
                className="select-option"
              >
                {option.name}
              </option>
            );
          })}
        </Field>
      </div>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;
