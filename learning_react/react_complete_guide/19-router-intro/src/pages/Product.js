import { Link, useParams } from "react-router-dom";

export default function Product() {
  const params = useParams();

  return (
    <>
      <h1>Some Product</h1>
      <p>{params.productId}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}
