import Options from "./Options";

export default function OrderEntry() {
  return (
    <div className="flex flex-col space-y-32">
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}
