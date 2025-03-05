import { useParams } from "react-router-dom";

export default function Product() {
  const params = useParams();

  return (
    <>
      <h1>Some Product</h1>
      <p>{params.productId}</p>
    </>
  );
}
