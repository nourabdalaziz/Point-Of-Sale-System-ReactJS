import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories.jsx";
import POS from "./Pages/POS.jsx";
import Products from "./Pages/Products.jsx";
import FetchedDataContext from "./Contexts/FetchedDataContext.jsx";
import { useState, useEffect } from "react";
import useFetch from "./CustomHooks/useFetch.jsx";
import LoginForm from "./Components/LoginForm.jsx";
import { Navigate } from "react-router-dom";

const App = () => {
  const [needToRefreshProductsData, setNeedToRefreshProductsData] =
    useState(false);
  const [needToRefreshCategData, setNeedToRefreshCategData] = useState(false);
  const [productsContext, setProductsContext] = useState([]);
  const [categContext, setCategContext] = useState([]);
  const [user, setUser] = useState("");

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
  }, [products, categories, needToRefreshCategData, needToRefreshProductsData]);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

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
        <Routes>
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <POS />
              </RequireAuth>
            }
          />
          <Route
            path="/categories"
            element={
              <RequireAuth>
                <Categories />
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/pos"
            element={
              <RequireAuth>
                <POS />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </FetchedDataContext.Provider>
  );
};
export default App;
