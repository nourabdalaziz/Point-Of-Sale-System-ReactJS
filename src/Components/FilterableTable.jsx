import "./filterableTable.css";
import { useState } from "react";
import Pagination from "./Pagination.jsx";

const FilterableTable = ({
  headers,
  dataInTable,
  searchedValue,
  toggleShowUpdateModal,
  deleteItem,
}) => {
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let currentItems = dataInTable;
  const pageNumbers = [];
  let totalItems = dataInTable.length;

  function isURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  }

  const filteredRows = dataInTable.filter((row) => {
    let res = false;
    let vals = Object.values(row);
    //pop the id(its value contains letters and numbers, which cause problem when searching)
    vals.pop();

    for (const val of vals) {
      if (isURL(val)) return false;
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
    currentPage = 1;
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
              {headers.map((header,index) => {
                return (
                  <th key={index}>{capetalizeFirstLetter(header)}</th>
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
                      ) : header === "price" ? (
                        <td key={Math.random()}>{item[header]} $</td>
                      ) : (
                        <td key={Math.random()}>{item[header]}</td>
                      );
                    })}
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteItem(item.id)}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          toggleShowUpdateModal(item.id);
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
