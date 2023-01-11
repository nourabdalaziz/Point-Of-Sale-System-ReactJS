import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormElementControl from "./FormElementControl.jsx";
import useCUD from "../CustomHooks/useCUD.jsx";
import FetchedDataContext from "../Contexts/FetchedDataContext.jsx";
import { useContext } from "react";

const UpdateCategoryForm = ({ closeModal, id }) => {
  const {
    categContext,
    needToRefreshCategData,
    setNeedToRefreshCategData,
    setNeedToRefreshProductsData,
    needToRefreshProductsData,
    productsContext,
  } = useContext(FetchedDataContext);
  const selectedRow = categContext.filter((item) => item.id === id)[0];
  const initialValues = {
    name: selectedRow.name,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const dataToSend = {
      name: values.name,
    };
    const prom = useCUD(
      `http://localhost:5000/categories/`,
      "PUT",
      dataToSend,
      id
    );
    prom
      .then((res) => res.json())
      .then(() => {
        closeModal();
        setNeedToRefreshCategData(!needToRefreshCategData);
      })
      .then(() => {
        productsContext.forEach((product) => {
          if (product.category === selectedRow.name) {
            const productToUpdateAfterCateg = {
              code: product.code,
              name: product.name,
              category: values.name,
              price: product.price,
              image: product.image,
            };
            const prom = useCUD(
              `http://localhost:5000/products/`,
              "PUT",
              productToUpdateAfterCateg,
              product.id
            );
            prom.then(() => {
              setNeedToRefreshProductsData(!needToRefreshProductsData);
            });
          }
        });
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
export default UpdateCategoryForm;
