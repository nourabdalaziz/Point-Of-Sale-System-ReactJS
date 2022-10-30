import "./filterableGrid.css";

const GridLayout = ({ dataInGrid, searchedValue, addItemToCart }) => {
  let currentItems = dataInGrid;

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

  const filteredRows = dataInGrid.filter((row) => {
    let res = false;
    let vals = Object.values(row);
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
  }
  return (
    <div className="grid-container">
      {currentItems.map((item) => (
        <div
          key={Math.random()}
          className="grid-item"
          onClick={() => addItemToCart(item)}
        >
          <p> {item.code}</p>
          <h4> {item.name}</h4>
          <img src={item.image} style={{ height: "60px", width: "60px" }} />
          <h6> {item.category}</h6>
        </div>
      ))}
    </div>
  );
};
export default GridLayout;
