import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormElementControl from "./FormElementControl.jsx";
import useFetch from "../CustomHooks/useFetch.jsx";
import useCUD from "../CustomHooks/useCUD.jsx";
import ProductsDataContext from "../Contexts/ProductsDataContext.jsx";
import { useContext } from "react";

const AddProductForm = ({ closeModal }) => {
  const { context, setContext } = useContext(ProductsDataContext);
  const [options] = useFetch(" http://localhost:5000/categories");

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
    code: "",
    name: "",
    category: "",
    price: "",
    image: "",
  };

  const validationSchema = Yup.object({
    code: Yup.number()
      .typeError("Product code must be a number")
      .positive("Product code must be greater than zero")
      .required("Required"),
    name: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    price: Yup.number()
      .typeError("Product price must be a number")
      .positive("Product price must be greater than zero")
      .required("Required"),
    image: Yup.string().typeError("Product image must be a valid URL").url(),
  });

  const onSubmit = (values) => {
    const dataToSend = {
      code: values.code,
      name: values.name,
      category: values.category,
      price: values.price,
      image: values.image,
      id: create_UUID(),
    };
    const prom = useCUD("http://localhost:5000/products", "POST", dataToSend);
    prom.then(() => {
      closeModal();
      setContext([...context, dataToSend]);
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
            <h2>Add New Product</h2>
            <FormElementControl
              control="input"
              label="Product Code"
              name="code"
            />
            <FormElementControl
              control="input"
              label="Product Name"
              name="name"
            />
            {options && (
              <FormElementControl
                control="select"
                label="Product Category"
                name="category"
                options={options}
              />
            )}
            <FormElementControl control="input" label="Price" name="price" />
            <FormElementControl
              control="input"
              label="Product Image URL"
              name="image"
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
