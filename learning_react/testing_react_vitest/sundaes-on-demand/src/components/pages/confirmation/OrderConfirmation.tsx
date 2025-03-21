import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../ui/ErrorAlert";
import { ORDER_ENTRY_ALERT_MESSAGE } from "../../../constants";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderNumber } from "../../../queries";

export default function OrderConfirmation() {
  const {
    data: orderNumber,
    isLoading,
    isError,
  } = useQuery<number>({
    queryFn: () => fetchOrderNumber(),
    queryKey: ["confirmation"],
  });
  const { resetOrder } = useOrderDetails();
  const navigate = useNavigate();

  function handleClick() {
    resetOrder();
    navigate("/");
  }

  if (isError) {
    return <ErrorAlert errorMessage={ORDER_ENTRY_ALERT_MESSAGE} />;
  }

  if (isLoading) {
    // TODO: Loading element.
    return <p>Loading...</p>;
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
  }
}
