import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../slices/cartApiSlice";
import { BASE_URL } from "../constants";

const CartScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: cartItems, isLoading, error, refetch } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);

  const addToCartHandler = async (item, qty) => {
    await addToCart({ ...item, quantity: qty }).unwrap();
    refetch();
  };
  const removeFromCartHandler = async (id) => {
    await removeFromCart(id).unwrap();
    refetch();
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>
          You need to be logged in to access your cart. Please{" "}
          <Link to="/login?redirect=/cart">Login</Link> or{" "}
          <Link to="/register?redirect=/cart">Register</Link> to access your
          cart.
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={`${BASE_URL}${item.image}`} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <Link
                          to={`/product/${item.product}`}
                          className="custom-link"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.quantity}
                          onChange={(e) => {
                            addToCartHandler(item, Number(e.target.value));
                          }}
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            removeFromCartHandler(item.product);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col>
            <Card style={{ marginTop: "20px" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    items
                  </h2>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-dark"
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;
