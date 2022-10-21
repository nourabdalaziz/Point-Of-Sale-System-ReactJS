import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="siteName">
        POS
      </Link>
      <ul className="navbar-titles">
        <Link to="/categories" className="navLink">
          Categoris
        </Link>
        <Link to="/pos" className="navLink">
          POS
        </Link>
        <Link to="/products" className="navLink">
          Products
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
