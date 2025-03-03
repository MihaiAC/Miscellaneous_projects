import Button from "./Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="Reactfood logo" />
        <h1>Reactfood</h1>
      </div>
      <Button className="text-button">Cart (0)</Button>
    </header>
  );
}
