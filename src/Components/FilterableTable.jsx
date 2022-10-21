import "./filterableTable.css";

const FilterableTable = ({
  headers,
  dataInTable,
  searchedValue,
  editProduct,
}) => {
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

  const capetalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <table>
      <thead>
        <tr>
          {" "}
          {headers.map((header) => {
            return <th key={Math.random()}>{capetalizeFirstLetter(header)}</th>;
          })}
          <th key={Math.random()}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataInTable
          .filter((row) => {
            let res = false;
            let vals = Object.values(row);
            if (isURL(vals[length - 1])) vals.pop();
            for (const val of vals) {
              res = val
                .toString()
                .toLowerCase()
                .includes(searchedValue.toString().toLowerCase());
              if (res) break;
            }
            return res;
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
                  <i className="fa-solid fa-trash"></i>
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => editProduct(item.code)}
                  ></i>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default FilterableTable;
