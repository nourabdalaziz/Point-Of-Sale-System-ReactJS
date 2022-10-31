import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories.jsx";
import POS from "./Pages/POS.jsx";
import Products from "./Pages/Products.jsx";
import Navbar from "./Components/Navbar.jsx";
import FetchedDataContext from "./Contexts/FetchedDataContext.jsx";
import { useState, useEffect } from "react";
import useFetch from "./CustomHooks/useFetch.jsx";

const App = () => {
  const [needToRefreshData, setNeedToRefreshData] = useState(false);
  const [productsContext, setProductsContext] = useState([]);
  const [categContext, setCategContext] = useState([]);

  const [products, isLoadingProducts] = useFetch(
    "http://localhost:5000/products",
    needToRefreshData
  );

  const [categories, isLoadingCategs] = useFetch(
    "http://localhost:5000/categories",
    needToRefreshData
  );

  useEffect(() => {
    products && setProductsContext(products);
    categories && setCategContext(categories);
  }, [products, categories]);

  return (
    <FetchedDataContext.Provider
      value={{
        productsContext,
        setProductsContext,
        needToRefreshData,
        setNeedToRefreshData,
        isLoadingProducts,
        categContext,
        setCategContext,
        isLoadingCategs,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<POS />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/pos" element={<POS />} />
        </Routes>
      </BrowserRouter>
    </FetchedDataContext.Provider>
  );
};
export default App;
