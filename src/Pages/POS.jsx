import { useContext, useState, useEffect } from "react";
import ProductsDataContext from "../Contexts/ProductsDataContext.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import FilterableGrid from "../Components/FilterableGrid.jsx";

const POS = () => {
  const { context, isLoading } = useContext(ProductsDataContext);
  const [searchedValue, setSearchedValue] = useState("");

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="pos-main-container">
            <div className="search-grid-container">
              <input
                type="search"
                placeholder="Search ..."
                className="pos-search"
                onChange={(e) => setSearchedValue(e.target.value)}
              />{" "}
              <FilterableGrid
                dataInGrid={context}
                searchedValue={searchedValue}
              />{" "}
              <div className="cart">
                <h2>Cart</h2>
              </div>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default POS;
