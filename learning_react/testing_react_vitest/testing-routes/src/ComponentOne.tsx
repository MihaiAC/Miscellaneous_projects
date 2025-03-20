import { Link } from "react-router-dom";

export default function ComponentOne() {
  return (
    <div>
      <h1>Component One</h1>
      <Link to="/two">CLICKME</Link>
    </div>
  );
}
