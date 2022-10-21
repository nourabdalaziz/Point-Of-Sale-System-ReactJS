import useFetch from "../CustomHooks/useFetch.jsx";

const Products = () => {
  const [products, isLoading] = useFetch("http://localhost:3000/products");

  console.log(products);
  return (
    <div>
      <h1>Hello from Products</h1>
      {isLoading ? <h2>Loading...</h2> : <h2>Finished fetching</h2>}{" "}
    </div>
  );
};
export default Products;
