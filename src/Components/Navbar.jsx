import { Link } from "react-router-dom";
import "./Components_Styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="siteName" style={{ fontWeight: "1000" }}>
        <img src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/50/000000/external-Pos-smooth-conceptual-smashingstocks-flat-smashing-stocks.png" />
        <div> Point Of Sale</div>
      </Link>
      <ul className="navbar-titles">
        <Link to="/pos" className="navLink">
          POS
        </Link>
        <Link to="/categories" className="navLink">
          Categoris
        </Link>
        <Link to="/products" className="navLink">
          Products
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
