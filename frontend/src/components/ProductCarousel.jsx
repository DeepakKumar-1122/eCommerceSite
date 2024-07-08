import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { BASE_URL } from "../constants";

const ProductCarousel = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();
  if (!isLoading) {
    console.log(topProducts);
  }
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{`Failed to load top products`}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="carousel bg-dark d-block w-100 carousel-fade mt-3 mb-5"
    >
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={`${BASE_URL}${product.image}`}
              alt={product.name}
              fluid
            />
          </Link>
          <Carousel.Caption className="carousel-caption d-none d-md-block">
            <h3>{product.name}</h3>
            <p>{product.description.substring(0, 100)}...</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
