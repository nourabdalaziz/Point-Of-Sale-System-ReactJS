import { useState, useRef, useContext } from "react";
import FilterableTable from "../Components/FilterableTable.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import Modal from "../Components/Modal.jsx";
import AddProductForm from "../Components/AddProductForm.jsx";
import UpdateProductForm from "../Components/UpdateProductForm.jsx";
import ProductsDataContext from "../Contexts/ProductsDataContext.jsx";

const Products = () => {
  const { context, needToRefreshData, setNeedToRefreshData, isLoading } =
    useContext(ProductsDataContext);
  const [searchedValue, setSearchedValue] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const HEADERS = ["code", "name", "category", "price", "image"];
  const idToUpdate = useRef(0);

  const handleDeleteProduct = (productID) => {
    console.log(productID, "..");
    fetch(`http://localhost:5000/products/${productID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setNeedToRefreshData(!needToRefreshData);
        console.log(res);
      });
  };

  const toggleShowAddProductModal = () => {
    setShowAddProductModal(!showAddProductModal);
  };

  const toggleShowUpdateProductModal = (id) => {
    idToUpdate.current = id;
    setShowUpdateProductModal(!showUpdateProductModal);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        context && (
          <>
            <div className="main-wrapper-products">
              <div className="search-and-button">
                <button
                  className="add-button-element"
                  onClick={() => toggleShowAddProductModal()}
                >
                  Add Product
                </button>{" "}
                <input
                  type="search"
                  placeholder=" Search .. "
                  className="general-search-field"
                  onChange={(e) => setSearchedValue(e.target.value)}
                />
              </div>
              <FilterableTable
                headers={HEADERS}
                dataInTable={context}
                searchedValue={searchedValue}
                toggleShowUpdateModal={toggleShowUpdateProductModal}
                deleteItem={handleDeleteProduct}
              />
              {showAddProductModal ? (
                <Modal>
                  <div>
                    <AddProductForm
                      closeModal={toggleShowAddProductModal}
                      productsData={context}
                    />
                  </div>
                </Modal>
              ) : null}
              {showUpdateProductModal ? (
                <Modal>
                  <div>
                    <UpdateProductForm
                      closeModal={toggleShowUpdateProductModal}
                      id={idToUpdate.current}
                    />
                  </div>
                </Modal>
              ) : null}
            </div>
          </>
        )
      )}
    </div>
  );
};
export default Products;
