import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useGetCartQuery, useClearCartMutation } from "../slices/cartApiSlice";
import { addDecimals } from "../utils/cartUtils.js";
// import { BASE_URL } from "../constants.js";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const [createOrder, { isLoading: isLoadingOrder, error: orderError }] = useCreateOrderMutation();
  const { data: cartItems, isLoading: isLoadingCart, error: cartError } = useGetCartQuery();
  const [clearCart] = useClearCartMutation();
  
  const shipping = useSelector((state) => state.shipping);

  useEffect(() => {
    if (!shipping.shippingAddress.address) {
      navigate("/shipping");
    } else if (!shipping.paymentMethod) {
      navigate("/payment");
    }
  }, [shipping.paymentMethod, shipping.shippingAddress.address, navigate]);

  if (isLoadingCart) {
    return <Loader />;
  }

  if (cartError) {
    return <Message variant="danger">{cartError.message}</Message>;
  }

  const itemsPrice = addDecimals(
    cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    )
  );
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number(itemsPrice) * 0.15);
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: shipping.shippingAddress,
        paymentMethod: shipping.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      }).unwrap();
      toast.success("Order placed successfully");
      await clearCart().unwrap();
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="p-3">
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shipping.shippingAddress.address},{" "}
                {shipping.shippingAddress.city}{" "}
                {shipping.shippingAddress.postalCode},{" "}
                {shipping.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="p-3">
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {shipping.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="p-3">
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message className="p-3">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush" className="p-3">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className="custom-link"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="text-center">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {orderError && (
                  <Message variant="danger">
                    {orderError?.data?.message || orderError.message}
                  </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="btn btn-outline-dark"
                  className="my-3"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoadingOrder && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
