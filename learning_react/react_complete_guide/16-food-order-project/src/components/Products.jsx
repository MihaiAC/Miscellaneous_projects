import useFetch from "../hooks/useFetch";
import Product from "./Product";

export default function Products() {
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch("http://localhost:3000/meals");

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
