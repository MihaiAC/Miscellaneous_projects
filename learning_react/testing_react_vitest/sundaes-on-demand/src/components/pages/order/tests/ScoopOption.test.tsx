import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";
import { SAMPLE_SCOOPS } from "../../../../test-utils/testingConstants";

const routerOpts = {
  initialEntries: ["/"],
};

const { name, imagePath } = SAMPLE_SCOOPS[0];

const routes = [
  { path: "/", element: <ScoopOption name={name} imagePath={imagePath} /> },
];

test("indicate if scoop is not an integer or outside bounds", async () => {
  const user = userEvent.setup();
  render(routes, routerOpts);

  // Expect input to be invalid with negative number.
  const scoopInput = screen.getByRole("spinbutton");
  await user.clear(scoopInput);
  await user.type(scoopInput, "-1");
  expect(scoopInput).toHaveClass("input-error");

  // Expect input to be invalid with decimal input.
  await user.clear(scoopInput);
  await user.type(scoopInput, "2.5");
  expect(scoopInput).toHaveClass("input-error");

  // Input too high.
  await user.clear(scoopInput);
  await user.type(scoopInput, "11");
  expect(scoopInput).toHaveClass("input-error");

  // Input not a number.
  await user.clear(scoopInput);
  await user.type(scoopInput, "abc");
  expect(scoopInput).toHaveClass("input-error");

  // Valid input.
  await user.clear(scoopInput);
  await user.type(scoopInput, "3");
  expect(scoopInput).not.toHaveClass("input-error");
});
