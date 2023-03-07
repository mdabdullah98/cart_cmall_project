import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { cartOpenClose, addCartItem, removeCartItem } from "./Redux/Slices";

export const CartModals = ({ Children }) => {
  return ReactDOM.createPortal(
    <ModalsContent>{Children}</ModalsContent>,
    document.getElementById("cart-modal")
  );
};

const Wrapper = styled.section`
  width: min(25rem, 70%);
  background: white;
  box-shadow: 0 0.5rem 0.5rem -0.32rem black;
  padding: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  animation: cart-anime 0.5s ease-in-out forwards;
  @keyframes cart-anime {
    0% {
      transform: translateY(-4rem);
      opacity: 0;
    }
    40% {
      transform: translateY(0rem);
      opacity: 1;
    }
    60% {
      transform: translateY(-2rem);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
function ModalsContent() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);
  const closecartHandler = () => {
    dispatch(cartOpenClose());
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    if (cartItem.length !== 0) {
      totalPrice = cartItem
        .map((item) => item.totalPrice)
        .reduce((accu, curr) => (accu += curr));
    }
    return totalPrice;
  };
  let totalPrice = getTotalPrice();
  return (
    <>
      <Wrapper>
        <div className="w-100 d-flex justify-content-end align-items-center">
          <button className="btn btn-sm btn-danger" onClick={closecartHandler}>
            close
          </button>
        </div>
        {cartItem.map((item) => {
          let { id, itemName, price, quantity } = item;
          return (
            <div
              className="w-100 d-flex  justify-content-between align-items-center my-3"
              key={id}
            >
              <h5 className="m-0">{itemName}</h5>
              <div>
                Rs {price} * <span className="text-danger">{quantity}</span>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-1"
                  onClick={() => dispatch(addCartItem(item))}
                >
                  +
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch(removeCartItem(item))}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
        <div className="w-100 d-flex justify-content-end">
          Total {totalPrice}
        </div>
      </Wrapper>
    </>
  );
}
