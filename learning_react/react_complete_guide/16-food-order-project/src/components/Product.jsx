import PropTypes from "prop-types";
import Button from "./UI/Button";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/priceFormatting";

export default function Product({ productData }) {
  const { addProduct } = useContext(CartContext);
  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${productData.image}`}
          alt={productData.image}
        ></img>
        <div>
          {" "}
          <h3>{productData.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(productData.price)}
          </p>
          <div className="meal-item-description">{productData.description}</div>
          <Button
            type="button"
            className="meal-item-actions button"
            onClick={() =>
              addProduct({
                id: productData.id,
                name: productData.name,
                price: productData.price,
              })
            }
          >
            Add to Cart
          </Button>
        </div>
      </article>
    </li>
  );
}

Product.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired, // Consider changing this to number if it's numerical
  }).isRequired,
};
