import { showNotification } from "./displaySlice";

const dbUrl = process.env.FIREBASE_DB_URL;

export const fetchCartData = () => {
  return (dispatch) => {
    const fetchData = async () => {
      const response = await fetch();
    };
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
