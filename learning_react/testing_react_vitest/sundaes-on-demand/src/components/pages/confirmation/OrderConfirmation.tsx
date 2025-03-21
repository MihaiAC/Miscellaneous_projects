import axios from "axios";
import { useState, useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../ui/ErrorAlert";
import { ORDER_ENTRY_ALERT_MESSAGE } from "../../../constants";

export default function OrderConfirmation() {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Custom confirmation response type. Change tests too.
    // TODO: Should replace with React-query.
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  function handleClick() {
    resetOrder();
    navigate("/");
  }

  if (error) {
    return <ErrorAlert errorMessage={ORDER_ENTRY_ALERT_MESSAGE} />;
  }

  if (orderNumber) {
    return (
      <div>
        <h1>Thank you!</h1>
        <p>Confirmation number: {orderNumber}</p>
        <p>Nothing will happen now!</p>
        <button onClick={handleClick}>Create new order</button>
      </div>
    );
  } else {
    // TODO: Loading element.
    return <p>Loading...</p>;
  }
}
