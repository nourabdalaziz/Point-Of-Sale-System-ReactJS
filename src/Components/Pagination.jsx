import "./pagination.css";

const Pagination = ({ currentPage, pageNumbers, setCurrentPage }) => {
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
      <nav className="pagination-container">
        <div className="currpage">
          Page {currentPage} of {pageNumbers.length}
        </div>
        <ul className="pagination">
          <li>
            <button
              onClick={() => {
                currentPage > 1 && setCurrentPage(currentPage - 1);
              }}
              className="page-link"
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={"pageNum"}>
              <button onClick={() => pagination(number)}> {number} </button>
            </li>
          ))}
          <li>
            {" "}
            <button
              onClick={() => {
                currentPage < pageNumbers.length &&
                  setCurrentPage(currentPage + 1);
              }}
              className="page-link"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
  );
};
export default Pagination;
