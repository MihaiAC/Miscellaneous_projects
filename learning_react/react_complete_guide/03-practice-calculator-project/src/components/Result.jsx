import { calculateInvestmentResults, formatter } from "../util/investment";

// eslint-disable-next-line react/prop-types
export default function Result({ data }) {
  let newData = calculateInvestmentResults(data);

  return <p>{Object.values(data)}</p>;
}
