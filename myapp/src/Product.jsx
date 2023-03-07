import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { cartOpenClose, addCartItem } from "./Redux/Slices";
const Wrapper = styled.section`
  width: 90%;
  margin: 5rem auto;
  height: 100%;

  .mygrid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    .boxes {
      padding: 0.5rem;
      margin: 0.5rem;
      border: 1px solid black;
      h3 {
        margin: min(0.2rem, 2vw);
      }
      .price-buy-button {
        width: 100%;
        display: flex;
        justify-content: space-between;

        h4 {
          margin: 0.5rem 0;
          span {
            color: red;
          }
        }
      }
    }
  }
  button {
    outline: none;
    padding: 0.3rem 0.8rem;
    cursor: pointer;
    &:focus {
      background: lightcyan;
      border: 1px solid orangered;
    }
  }
  .button-right {
    text-align: right;
  }
`;
const Product = () => {
  const dispatch = useDispatch();
  let productsArr = [
    {
      id: 1,
      itemName: "realme nazro",
      price: 15999,
      specs: "4gb ram 64 gb rom ",
    },
    {
      id: 2,
      itemName: "samsung s23 ultra",
      price: 107000,
      specs: "12gb ram 124gb rom",
    },
    {
      id: 3,
      itemName: "onplus 11R",
      price: 59000,
      specs: "8gb ram 128gb ram",
    },
    {
      id: 4,
      itemName: "redmi 10",
      price: 9999,
      specs: "4gb ram 64gb rom",
    },
  ];

  const cartOpenCloseHandler = () => {
    dispatch(cartOpenClose());
  };
  const addCartItemHnadler = (item) => {
    dispatch(addCartItem(item));
  };
  return (
    <Wrapper>
      <div className="button-right" onClick={cartOpenCloseHandler}>
        <button className="btn btn-sm btn-outline-warning">cart</button>
      </div>
      <div className="mygrid">
        {productsArr.map((item) => {
          let { itemName, price, specs, id } = item;
          return (
            <div className="boxes" key={id}>
              <h3>{itemName}</h3>
              <p>{specs}</p>
              <div className="price-buy-button">
                <h4>
                  Price : <span> {price}</span>
                </h4>
                <button onClick={() => addCartItemHnadler(item)}>
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Product;
