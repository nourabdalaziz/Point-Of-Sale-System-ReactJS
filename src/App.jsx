import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories.jsx";
import POS from "./Pages/POS.jsx";
import Products from "./Pages/Products.jsx";
import Navbar from "./Components/Navbar.jsx";
import ProductsDataContext from "./Contexts/ProductsDataContext.jsx";
import { useState, useEffect } from "react";
import useFetch from "./CustomHooks/useFetch.jsx";

const App = () => {
  const [needToRefreshData, setNeedToRefreshData] = useState(false);
  const [context, setContext] = useState([]);

  const [products, isLoading] = useFetch(
    "http://localhost:5000/products",
    needToRefreshData
  );

  useEffect(() => {
    products && setContext(products);
  }, [products]);

  return (
    <ProductsDataContext.Provider
      value={{
        context,
        setContext,
        needToRefreshData,
        setNeedToRefreshData,
        isLoading,
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
    </ProductsDataContext.Provider>
  );
};
export default App;
