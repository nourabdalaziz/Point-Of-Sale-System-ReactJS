import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormElementControl from "./FormElementControl.jsx";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import TextError from "./TextError.jsx";
import { useNavigate } from "react-router-dom";
import "./Components_Styles/loginForm.css";

function LoginForm({ setUser }) {
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigateTo("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className="loginForm-container">
            <div className="loginForm-subcontainer">
              <div className="loginForm-inputs">
                <FormElementControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                />
                <FormElementControl
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                />
              </div>{" "}
              {error && <TextError>Wrong Email or Password</TextError>}
              <div className="loginButton">
                <button type="submit">Login</button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
