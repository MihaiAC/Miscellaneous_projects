// This function expects a JS object as an argument
// The object should contain the following properties
// - inputData['initialInvestment']: The initial investment amount
// - inputData['annualInvestment']: The amount invested every year
// - inputData['expectedReturn']: The expected (annual) rate of return
// - inputData['duration']: The investment inputData['duration'] (time frame)
export function calculateInvestmentResults(inputData) {
  const annualData = [];

  let investmentValue = inputData["initialInvestment"];
  let annualInvestmentValue = inputData["annualInvestment"];
  let initialInvestment = 0;

  for (let i = 0; i < inputData["duration"]; i++) {
    const interestEarnedInYear =
      investmentValue * (inputData["expectedReturn"] / 100);
    investmentValue += interestEarnedInYear + annualInvestmentValue;

    if (i === 0) {
      initialInvestment =
        investmentValue - interestEarnedInYear - annualInvestmentValue;
    }

    const totalInterest =
      investmentValue - annualInvestmentValue - initialInvestment;
    const totalAmountInvested = investmentValue + annualInvestmentValue;

    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      totalInterest: totalInterest,
      totalAmountInvested: totalAmountInvested,
    });
  }

  return annualData;
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
