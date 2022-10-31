import { useContext, useState, useEffect } from "react";
import FetchedDataContext from "../Contexts/FetchedDataContext.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import FilterableGrid from "../Components/FilterableGrid.jsx";
import Cart from "../Components/Cart.jsx";

const POS = () => {
  const { productsContext, isLoadingProducts, categContext } =
    useContext(FetchedDataContext);
  const [searchedValue, setSearchedValue] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const subTotal = cart.reduce(
      (prev, curr) => +prev + +curr.totalPerProduct,
      0
    );
    const totalWithDiscount = subTotal - subTotal * (discount / 100);
    const totalWithTax = subTotal * (1 + tax / 100);
    tax && discount
      ? setTotal(totalWithDiscount * (1 + tax / 100))
      : tax
      ? setTotal(totalWithTax)
      : discount
      ? setTotal(totalWithDiscount)
      : setTotal(subTotal);
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
            if (itemInCart.quantity > 1) {
              itemWithNewQtty = {
                ...itemInCart,
                quantity: itemInCart.quantity - 1,
                totalPerProduct: (itemInCart.quantity - 1) * itemInCart.price,
              };
              editedCart.push(itemWithNewQtty);
            }
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
      {isLoadingProducts ? (
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
              <div className="pos-categories-btns">
                <button onClick={() => setSearchedValue("")}>All</button>
                {categContext &&
                  categContext.map((category) => {
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
              <FilterableGrid
                dataInGrid={productsContext}
                searchedValue={searchedValue}
                addItemToCart={addItemToCart}
              />{" "}
            </div>
            <Cart
              dataInCart={cart}
              deleteFromCart={deleteFromCart}
              editQtty={editQtty}
              setTax={setTax}
              setDiscount={setDiscount}
              total={total}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default POS;
