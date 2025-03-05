import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>Home page</h1>
      <p>
        Go to <Link to="/products">products</Link>
      </p>
    </>
  );
}
