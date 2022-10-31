import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormElementControl from "./FormElementControl.jsx";
import useCUD from "../CustomHooks/useCUD.jsx";
import FetchedDataContext from "../Contexts/FetchedDataContext.jsx";
import { useContext } from "react";

const AddProductForm = ({ closeModal }) => {
  const { categContext, setCategContext } = useContext(FetchedDataContext);

  function create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const dataToSend = {
      name: values.name,
      id: create_UUID(),
    };
    const prom = useCUD("http://localhost:5000/categories", "POST", dataToSend);
    prom.then(() => {
      closeModal();
      setCategContext([...categContext, dataToSend]);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <h2>Add New Category</h2>
            <FormElementControl
              control="input"
              label="Category Name"
              name="name"
            />
            <div className="form-buttons-container">
              <button onClick={closeModal} className="cancel-btn">
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formik.isValid}
                className="submit-btn"
              >
                Submit
              </button>{" "}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddProductForm;
