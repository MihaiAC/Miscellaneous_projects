import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Product from "./Product";

const initialFetchState = { data: null, error: null, loading: true };

export default function Products() {
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    sendRequest,
  } = useFetch("http://localhost:3000/meals", initialFetchState);

  useEffect(() => {
    async function fetchData() {
      await sendRequest();
    }
    fetchData();
  }, [sendRequest]);

  return (
    <>
      {productsLoading && <p>Loading our products...</p>}
      {productsError && (
        <p>There has been an error retrieving our products: {productsError}</p>
      )}
      {!productsLoading && !productsError && (
        <ul id="meals">
          {products.map((productData) => (
            <Product key={productData.id} productData={productData} />
          ))}
        </ul>
      )}
    </>
  );
}
