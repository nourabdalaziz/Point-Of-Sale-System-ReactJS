import { Field, ErrorMessage } from "formik";
import TextError from "./TextError.jsx";
import "./form.css";

const Input = ({ label, name, ...rest }) => {
  return (
    <div className="main-input-container">
      <div className="input-container">
        <label htmlFor="name" className="fieldslabel">
          {label}
        </label>
        <Field id={name} name={name} {...rest} className="input_field" />
      </div>
      <ErrorMessage component={TextError} name={name} />{" "}
    </div>
  );
};
export default Input;
