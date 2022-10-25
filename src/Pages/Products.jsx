import { useState, useEffect,useRef } from "react";
import useFetch from "../CustomHooks/useFetch.jsx";
import FilterableTable from "../Components/FilterableTable.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import Modal from "../Components/Modal.jsx";
import AddProductForm from "../Components/AddProductForm.jsx";

const Products = () => {
  const [needToRefreshData, setNeedToRefreshData] = useState(false);
  const [products, isLoading] = useFetch(
    "http://localhost:5000/products",
    needToRefreshData
  );
  const [productsData, setProductsData] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

  const HEADERS = ["code", "name", "category", "image"];
  const idToUpdate = useRef(0);

  useEffect(() => {
    console.log(productsData);
    setProductsData(products);
  }, [products]);

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
        productsData && (
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
                  onChange={(e) => setSearchedValue(e.target.value)}
                />
              </div>
              <FilterableTable
                headers={HEADERS}
                dataInTable={productsData}
                searchedValue={searchedValue}
                toggleShowUpdateProductModal={toggleShowUpdateProductModal}
                deleteProduct={handleDeleteProduct}
              />
              {showAddProductModal ? (
                <Modal>
                  <div>
                    <AddProductForm
                      closeModal={toggleShowAddProductModal}
                      setProductsData={setProductsData}
                      productsData={productsData}
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
