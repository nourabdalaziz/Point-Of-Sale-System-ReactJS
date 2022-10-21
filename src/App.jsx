import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories.jsx";
import POS from "./Pages/POS.jsx";
import Products from "./Pages/Products.jsx";
import Navbar from "./Components/Navbar.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<POS />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pos" element={<POS />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
