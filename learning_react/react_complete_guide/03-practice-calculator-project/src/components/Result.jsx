/* eslint-disable react/prop-types */
import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Result({ data }) {
  data.duration + "FROM RESULT";
  return (
    <>
      {data.isValid() && (
        <table id="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {calculateInvestmentResults(data).map((yearData) => (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>{formatter.format(yearData.valueEndOfYear)}</td>
                <td>{formatter.format(yearData.interest)}</td>
                <td>{formatter.format(yearData.totalInterest)}</td>
                <td>{formatter.format(yearData.totalAmountInvested)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
