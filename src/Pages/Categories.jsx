import { useState, useEffect, useRef } from "react";
import useFetch from "../CustomHooks/useFetch.jsx";
import useCUD from "../CustomHooks/useCUD.jsx";
import FilterableTable from "../Components/FilterableTable.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import Modal from "../Components/Modal.jsx";
import AddCategoryForm from "../Components/AddCategoryForm.jsx";
import UpdateCategoryForm from "../Components/UpdateCategoryForm.jsx";

const Categories = () => {
  const [needToRefreshData, setNeedToRefreshData] = useState(false);
  const [categories, isLoading] = useFetch(
    "http://localhost:5000/categories",
    needToRefreshData
  );
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);

  const HEADERS = ["name"];
  const idToUpdate = useRef(0);

  useEffect(() => {
    console.log(categoriesData);
    setCategoriesData(categories);
  }, [categories]);

  const handleDeleteCategory = (categoryId) => {
    console.log(categoryId, "..");
    const prom = useCUD(
      `http://localhost:5000/categories/`,
      "DELETE",
      "",
      categoryId
    );

    prom
      .then((res) => res.json())
      .then((res) => {
        setNeedToRefreshData(!needToRefreshData);
        console.log(res);
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        categoriesData && (
          <>
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
                  onChange={(e) => setSearchedValue(e.target.value)}
                />
              </div>
              <FilterableTable
                headers={HEADERS}
                dataInTable={categoriesData}
                searchedValue={searchedValue}
                toggleShowUpdateModal={toggleshowUpdateCategoryModal}
                deleteItem={handleDeleteCategory}
              />
              {showAddCategoryModal ? (
                <Modal>
                  <div>
                    <AddCategoryForm
                      closeModal={toggleshowAddCategoryModal}
                      setCategoriesData={setCategoriesData}
                      categoriesData={categoriesData}
                    />
                  </div>
                </Modal>
              ) : null}
              {showUpdateCategoryModal ? (
                <Modal>
                  <div>
                    <UpdateCategoryForm
                      closeModal={toggleshowUpdateCategoryModal}
                      setNeedToRefreshData={setNeedToRefreshData}
                      needToRefreshData={needToRefreshData}
                      categoriesData={categoriesData}
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
