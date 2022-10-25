import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormElementControl from "./FormElementControl.jsx";

const UpdateProductForm = ({
  closeModal,
  setNeedToRefreshData,
  needToRefreshData,
  productsData,
  id,
}) => {
  const selectedRow = productsData.filter((item) => item.id === id)[0];
  const initialValues = {
    code: selectedRow.code,
    name: selectedRow.name,
    category: selectedRow.category,
    image: selectedRow.image,
  };

  const validationSchema = Yup.object({
    code: Yup.number()
      .typeError("Product code must be a number")
      .positive("Product code must be greater than zero")
      .required("Required"),
    name: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    image: Yup.string().typeError("Product code must be a number").url(),
  });

  const onSubmit = (values) => {
    console.log(id);
    const dataToSend = {
      code: values.code,
      name: values.name,
      category: values.category,
      image: values.image,
    };
    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(dataToSend),
    })
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
            <FormElementControl control="input" label="Product Code" name="code" />
            <FormElementControl control="input" label="Product Name" name="name" />
            <FormElementControl
              control="input"
              label="Product Category"
              name="category"
            />
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
