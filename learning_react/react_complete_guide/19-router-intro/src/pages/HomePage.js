import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("products");
  }

  return (
    <>
      <h1>Home page</h1>
      <p>
        Go to <Link to="products">products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Take me to Products</button>
      </p>
    </>
  );
}
