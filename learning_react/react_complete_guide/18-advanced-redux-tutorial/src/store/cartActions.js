import { showNotification } from "./displaySlice";
import { replaceCart } from "./cartSlice";

const dbUrl = process.env.REACT_APP_FIREBASE_DB_URL + "db.json";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(dbUrl);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      let cartData = await fetchData();
      if (cartData === null) {
        cartData = {};
      }
      dispatch(replaceCart(cartData));
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed with error: " + error.message,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed with error: " + error.message,
        })
      );
    }
  };
};
