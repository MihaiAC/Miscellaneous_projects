import useFetch from "../hooks/useFetch";

export default function Products() {
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch("http://localhost:3000/meals");

  if (!productsLoading && !productsError) {
    console.log(products);
  }
}
