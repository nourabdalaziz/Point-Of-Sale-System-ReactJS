import useFetch from "../CustomHooks/useFetch.jsx";
import { useState } from "react";
import FilterableTable from "../Components/FilterableTable.jsx";

const Products = () => {
  const [products, isLoading] = useFetch("http://localhost:5000/products");
  const [searchedValue, setSearchedValue] = useState("");
  const HEADERS = ["code", "name", "category", "image"];

  const editProduct = (id) => {
    console.log(id, ".. hello from product editing function");
  };

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        products && (
          <>
            <input
              type="search"
              onChange={(e) => setSearchedValue(e.target.value)}
            />
            <FilterableTable
              headers={HEADERS}
              dataInTable={products}
              searchedValue={searchedValue}
              editProduct={editProduct}
            />
          </>
        )
      )}
    </div>
  );
};
export default Products;
