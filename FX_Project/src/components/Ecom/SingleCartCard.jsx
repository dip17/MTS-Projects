import React, { useState, useEffect } from "react";
import { Container, Breadcrumb, Row, Col, Table, Image, InputGroup, FormControl, Button, Form } from "react-bootstrap";
import "./Ecom.css";
import { Link } from "react-router-dom";
import { saveCartDetailsStart,
  removeCartDetailsStart
 } from "../../store/actions/ProductsAction";
 import { connect } from "react-redux";
import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";

const SingleCartCard = (props) => {

  const { cart } = props;

  const [subTotal, setSubTotal] = useState(cart.sub_total_formatted);

  // Set the initial count state to zero, 0
  const [count, setCount] = useState(cart.quantity);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    if(cart.user_product.quantity > count){
      props.dispatch(saveCartDetailsStart({cart_id: cart.cart_id,user_product_id: cart.user_product_id, quantity: count+1}));
      setCount(prevCount => prevCount + 1);
    }
      
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    if(count > 1){
      props.dispatch(saveCartDetailsStart({cart_id: cart.cart_id,user_product_id: cart.user_product_id, quantity: count-1}));
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <>
      <tr>
        <td>
            <Image
                className="ecom-cart-table-img"
                src={cart.user_product.picture}
            />
        </td>
        <td>{cart.user_product.name}</td>
        <td>{cart.user_product.user_product_price_formatted}</td>
        <td>
          <div className="ecom-cart-inc-dec">
            <Form>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text onClick={handleDecrement}><i className="fas fa-minus"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder={count +1}></FormControl>
                    <InputGroup.Append>
                        <InputGroup.Text onClick={handleIncrement}><i className="fas fa-plus"></i></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
          </div>
        </td>
        <td>{subTotal}</td>
        <td>
          <Button type="submit" className="btn-button btn-update tiny" 
          onClick={() => {
            if (window.confirm(t("remove_cart_confirmation"))) {
              props.dispatch(removeCartDetailsStart({cart_id: cart.cart_id,}));
            }
          }}>
          {t("remove")}
          </Button>
        </td>
      </tr>
    </>
  );
};

const mapStateToPros = (state) => ({
  cartList: state.userProducts.cartList,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(SingleCartCard));
