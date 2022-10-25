import "./filterableTable.css";
import { useState } from "react";
import Pagination from "./Pagination.jsx";

const FilterableTable = ({
  headers,
  dataInTable,
  searchedValue,
  toggleShowUpdateProductModal,
  deleteProduct,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  let currentItems = dataInTable;
  const pageNumbers = [];
  let totalItems = dataInTable.length;

  const filteredRows = dataInTable.filter((row) => {
    let res = false;
    let vals = Object.values(row);
    vals.pop();
    vals.pop();
    for (const val of vals) {
      res =
        !searchedValue.length ||
        val
          .toString()
          .toLowerCase()
          .includes(searchedValue.toString().toLowerCase());
      if (res) break;
    }
    return res;
  });
  
  if (searchedValue !== null && searchedValue !== "") {
    currentItems = filteredRows;
    totalItems = filteredRows.length;
    console.log("HELLO, IT'S ME FROM IF STATEMENT", currentItems);
  }

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const capetalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="main-container">
      <div className="table-component">
        <table>
          <thead>
            <tr>
              {" "}
              {headers.map((header) => {
                return (
                  <th key={Math.random()}>{capetalizeFirstLetter(header)}</th>
                );
              })}
              <th key={Math.random()}>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentItems
              .filter((row, index) => {
                let start = (currentPage - 1) * itemsPerPage;
                let end = currentPage * itemsPerPage;
                if (index >= start && index < end) return true;
              })

              .map((item) => {
                return (
                  <tr key={item.id}>
                    {headers.map((header) => {
                      return header === "image" ? (
                        <td>
                          <img className="product_image" src={item.image} />
                        </td>
                      ) : (
                        <td key={Math.random()}>{item[header]}</td>
                      );
                    })}
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteProduct(item.id)}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          toggleShowUpdateProductModal(item.id);
                          console.log(item.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default FilterableTable;
