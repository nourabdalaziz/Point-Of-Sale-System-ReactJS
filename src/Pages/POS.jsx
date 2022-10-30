import { useContext, useState, useEffect } from "react";
import ProductsDataContext from "../Contexts/ProductsDataContext.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import FilterableGrid from "../Components/FilterableGrid.jsx";
import useFetch from "../CustomHooks/useFetch.jsx";

const POS = () => {
  const { context, isLoading } = useContext(ProductsDataContext);
  const [searchedValue, setSearchedValue] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [categories] = useFetch("http://localhost:5000/categories");

  useEffect(() => {
    const totalSum = cart.reduce(
      (prev, curr) => +prev + +curr.totalPerProduct,
      0
    );

    tax ? setTotal(totalSum * tax) : setTotal(totalSum);
    discount
      ? setTotal(totalSum - totalSum * (discount / 100))
      : setTotal(totalSum);
  }, [cart, tax, discount]);

  const addItemToCart = (item) => {
    let isExistInCart = cart.find((i) => {
      return i.id === item.id;
    });

    if (isExistInCart) {
      editQtty(item, "plus");
    } else {
      let newItem = {
        ...item,
        quantity: 1,
        totalPerProduct: item.price,
      };
      setCart([...cart, newItem]);
    }
  };

  const editQtty = (item, operation) => {
    let itemWithNewQtty = {};
    const editedCart = [];
    switch (operation) {
      case "plus": {
        cart.forEach((itemInCart) => {
          if (itemInCart.id === item.id) {
            itemWithNewQtty = {
              ...itemInCart,
              quantity: itemInCart.quantity + 1,
              totalPerProduct: (itemInCart.quantity + 1) * itemInCart.price,
            };
            editedCart.push(itemWithNewQtty);
          } else {
            editedCart.push(itemInCart);
          }
        });
        break;
      }
      case "minus": {
        cart.forEach((itemInCart) => {
          if (itemInCart.id === item.id) {
            itemWithNewQtty = {
              ...itemInCart,
              quantity: itemInCart.quantity - 1,
              totalPerProduct: (itemInCart.quantity - 1) * itemInCart.price,
            };
            editedCart.push(itemWithNewQtty);
          } else {
            editedCart.push(itemInCart);
          }
        });
      }
    }

    setCart(editedCart);
  };

  const deleteFromCart = (itemToDelete) => {
    const filteredCart = cart.filter((item) => item.id !== itemToDelete.id);
    setCart(filteredCart);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="pos-main-container">
            <div className="search-grid-container">
              <input
                type="search"
                placeholder="Search ..."
                className="pos-search"
                onChange={(e) => setSearchedValue(e.target.value)}
              />{" "}
              <FilterableGrid
                dataInGrid={context}
                searchedValue={searchedValue}
                addItemToCart={addItemToCart}
              />{" "}
              <div className="pos-categories-btns">
                <button onClick={(e) => setSearchedValue("")}>All</button>

                {categories &&
                  categories.map((category) => {
                    return (
                      <button
                        key={Math.random()}
                        value={category.name}
                        onClick={(e) => {
                          setSearchedValue(e.target.value);
                        }}
                      >
                        {category.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="cart">
              <h2>Cart</h2>
              <div className="cart-items-list">
                {cart.map((item) => {
                  return (
                    <div key={Math.random()} className="itemInCart">
                      <i
                        className="fa fa-times-circle fa-2x"
                        aria-hidden="true"
                        onClick={() => deleteFromCart(item)}
                      ></i>
                      <img
                        src={item.image}
                        style={{ height: "50px", width: "50px" }}
                      />
                      <div className="itemInCart-nameAndPrice">
                        <div>{item.name}</div>
                        <div>{item.price} $</div>
                      </div>
                      <div className="itemInCart-quantity-and-buttons">
                        <i
                          className="fa fa-minus-circle fa-2x"
                          onClick={() => editQtty(item, "minus")}
                          aria-hidden="true"
                        ></i>

                        <div className="itemInCart-quantity">
                          {item.quantity}
                        </div>

                        <i
                          className="fa fa-plus-circle fa-2x"
                          onClick={() => editQtty(item, "plus")}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="itemInCart-totalPerProduct">
                        {item.totalPerProduct} $
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="cart-tax-total">
                <input type="text" onChange={(e) => setTax(e.target.value)} />
                <br />
                <input
                  type="text"
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <div>{total} $</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default POS;
