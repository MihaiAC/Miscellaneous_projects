import { Topping } from "../../types/types";

export default function ToppingOption({ name, imagePath }: Topping) {
  return (
    <div className="flex justify-center items-center">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
    </div>
  );
}
