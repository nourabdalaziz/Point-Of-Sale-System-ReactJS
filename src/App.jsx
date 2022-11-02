import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories.jsx";
import POS from "./Pages/POS.jsx";
import Products from "./Pages/Products.jsx";
import Navbar from "./Components/Navbar.jsx";
import FetchedDataContext from "./Contexts/FetchedDataContext.jsx";
import { useState, useEffect } from "react";
import useFetch from "./CustomHooks/useFetch.jsx";

const App = () => {
  const [needToRefreshProductsData, setNeedToRefreshProductsData] =
    useState(false);
  const [needToRefreshCategData, setNeedToRefreshCategData] = useState(false);
  const [productsContext, setProductsContext] = useState([]);
  const [categContext, setCategContext] = useState([]);

  const [products, isLoadingProducts] = useFetch(
    "http://localhost:5000/products",
    needToRefreshProductsData
  );
  

  const [categories, isLoadingCategs] = useFetch(
    "http://localhost:5000/categories",
    needToRefreshCategData
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
        needToRefreshProductsData,
        setNeedToRefreshProductsData,
        isLoadingProducts,
        categContext,
        setCategContext,
        isLoadingCategs,
        needToRefreshCategData,
        setNeedToRefreshCategData,
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
