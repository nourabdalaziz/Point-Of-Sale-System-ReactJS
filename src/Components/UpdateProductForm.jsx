import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormElementControl from "./FormElementControl.jsx";
import useFetch from "../CustomHooks/useFetch.jsx";
import useCUD from "../CustomHooks/useCUD.jsx";
import ProductsDataContext from "../Contexts/ProductsDataContext.jsx";
import { useContext } from "react";

const UpdateProductForm = ({
  closeModal,
  id,
}) => {
  const { context, needToRefreshData, setNeedToRefreshData } =
    useContext(ProductsDataContext);
  const [options] = useFetch(" http://localhost:5000/categories");
  const selectedRow = context.filter((item) => item.id === id)[0];
  const initialValues = {
    code: selectedRow.code,
    name: selectedRow.name,
    category: selectedRow.category,
    price: selectedRow.price,
    image: selectedRow.image,
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
    console.log(id);
    const dataToSend = {
      code: values.code,
      name: values.name,
      category: values.category,
      price: values.price,
      image: values.image,
    };

    const prom = useCUD(
      `http://localhost:5000/products/`,
      "PUT",
      dataToSend,
      id
    );
    prom
      .then((res) => res.json())
      .then(() => {
        closeModal();
        setNeedToRefreshData(!needToRefreshData);
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
            <img
              src={selectedRow.image}
              style={{ height: "100px", width: "100px" }}
            />
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
export default UpdateProductForm;
