import "./Components_Styles/cart.css";

const Cart = ({
  dataInCart,
  deleteFromCart,
  editQtty,
  setTax,
  setDiscount,
  total,
  subTotal,
}) => {
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items-list">
        {dataInCart.map((item) => {
          return (
            <div key={item.id} className="itemInCart">
              <i
                className="fa fa-times-circle fa-2x"
                aria-hidden="true"
                onClick={() => deleteFromCart(item)}
              ></i>
              <img src={item.image} style={{ height: "40px", width: "40px" }} />
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

                <div className="itemInCart-quantity">{item.quantity}</div>

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
      <div className="cart-tax-disc-total">
        <div className="cart-input-container">
          <label htmlFor="tax-input">Subtotal: </label>{" "}
          <span>{subTotal} $</span>
        </div>
        <div className="cart-input-container">
          <label htmlFor="tax-input">Tax:</label>{" "}
          <input
            id="tax-input"
            placeholder="%"
            className="cart-input-field"
            type="text"
            onChange={(e) => setTax(e.target.value)}
          />
        </div>
        <div className="cart-input-container">
          <label htmlFor="discount-input">Discount :</label>{" "}
          <input
            id="discount-input"
            placeholder="%"
            className="cart-input-field"
            type="text"
            onChange={(e) => setDiscount(e.target.value)}
          />{" "}
        </div>
        <div className="cart-input-container cart-total-sum">
          <label htmlFor="tax-input">Total: </label> <span>{total} $</span>
        </div>
        <div className="cart-checkout-btns">
          <button>Cancel</button>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
