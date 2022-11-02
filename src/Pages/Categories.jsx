import { useState, useRef, useContext } from "react";
import useCUD from "../CustomHooks/useCUD.jsx";
import FilterableTable from "../Components/FilterableTable.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import Modal from "../Components/Modal.jsx";
import AddCategoryForm from "../Components/AddCategoryForm.jsx";
import UpdateCategoryForm from "../Components/UpdateCategoryForm.jsx";
import FetchedDataContext from "../Contexts/FetchedDataContext.jsx";
import Navbar from "../Components/Navbar.jsx";

const Categories = () => {
  const {
    categContext,
    setCategContext,
    isLoadingCategs,
    productsContext,
    setProductsContext,
  } = useContext(FetchedDataContext);
  const [searchedValue, setSearchedValue] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const HEADERS = ["name"];
  const idToUpdate = useRef(0);

  const handleDeleteCategory = (categoryId) => {
    const prom = useCUD(
      `http://localhost:5000/categories/`,
      "DELETE",
      "",
      categoryId
    );

    prom.then(() => {
      let categToDelete = "";
      const filteredCategs = categContext.filter((categ) => {
        if (categ.id === categoryId) {
          categToDelete = categ.name;
          return false;
        }
        return true;
      });
      setCategContext(filteredCategs);
      setProductsContext(
        productsContext.filter((product) => product.category !== categToDelete)
      );
    });
  };

  const toggleshowAddCategoryModal = () => {
    setShowAddCategoryModal(!showAddCategoryModal);
  };

  const toggleshowUpdateCategoryModal = (id) => {
    idToUpdate.current = id;
    setShowUpdateCategoryModal(!showUpdateCategoryModal);
  };

  return (
    <div>
      {isLoadingCategs ? (
        <LoadingSpinner />
      ) : (
        categContext && (
          <>
            <Navbar />
            <div className="main-wrapper-categories">
              <div className="search-and-button">
                <button
                  className="add-button-element"
                  onClick={() => toggleshowAddCategoryModal()}
                >
                  Add Category
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
                dataInTable={categContext}
                searchedValue={searchedValue}
                toggleShowUpdateModal={toggleshowUpdateCategoryModal}
                deleteItem={handleDeleteCategory}
              />
              {showAddCategoryModal ? (
                <Modal>
                  <div>
                    <AddCategoryForm
                      closeModal={toggleshowAddCategoryModal}
                      categoriesData={categContext}
                    />
                  </div>
                </Modal>
              ) : null}
              {showUpdateCategoryModal ? (
                <Modal>
                  <div>
                    <UpdateCategoryForm
                      closeModal={toggleshowUpdateCategoryModal}
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
export default Categories;
