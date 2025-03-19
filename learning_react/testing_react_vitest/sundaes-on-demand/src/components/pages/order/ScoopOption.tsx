import { Scoop } from "../../types/types";

export default function ScoopOption({ name, imagePath }: Scoop) {
  return (
    <div className="flex justify-center items-center">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </div>
  );
}
