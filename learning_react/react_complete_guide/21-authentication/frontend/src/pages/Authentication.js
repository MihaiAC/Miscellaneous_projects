import AuthForm from "../components/AuthForm";
import { redirect } from "react-router-dom";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  // Get the mode.
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  // Get submitted login details.
  const data = await request.formData();
  // Name in get matches name in form input field.
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // Send the request to the backend.
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  // Handle specific error codes.
  // 422 = unprocessable entity; validation failed or invalid/missing
  // data in request body
  // 401 = unauthorized, classic;
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  // Handle all the other error codes.
  if (!response.ok) {
    throw Response(
      JSON.stringify({ message: "Could not authenticate user." }),
      { status: 500 }
    );
  }

  // Save token in localStorage.
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
