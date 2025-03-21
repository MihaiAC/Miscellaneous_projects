import { render, screen } from "../../../../test-utils/testing-library-utils";
import { http, HttpResponse } from "msw";
import { server } from "../../../../mocks/server";
import { ORDER_ENTRY_ALERT_MESSAGE } from "../../../../constants";
import { OptionType } from "../../../types/types";
import { appRoutes } from "../../../../router/routerConfig";
import userEvent from "@testing-library/user-event";
import { SAMPLE_SCOOPS } from "../../../../test-utils/testingConstants";
import { waitFor } from "@testing-library/react";

const routerOpts = {
  initialEntries: ["/"],
};

test("disable order button if there are no scoops ordered", async () => {
  const user = userEvent.setup();
  render(appRoutes, routerOpts);

  // Test button is disabled on component render.
  const orderBtn = screen.getByRole("button", { name: /Checkout/i });
  expect(orderBtn).toBeDisabled();

  // Test button is enabled after adding a scoop.
  const scoopName = SAMPLE_SCOOPS[0].name;
  const scoopInput = await screen.findByRole("spinbutton", {
    name: scoopName,
  });
  await user.clear(scoopInput);
  await user.type(scoopInput, "1");
  expect(orderBtn).toBeEnabled();

  // Test button is disabled after removing the scoop.
  await user.clear(scoopInput);
  await user.type(scoopInput, "0");
  expect(orderBtn).toBeDisabled();
});

test("handles error for OptionType routes", async () => {
  const OPTION_TYPES = Object.values(OptionType);

  // Override handlers to return error response.
  server.resetHandlers(
    ...OPTION_TYPES.map((optionType) =>
      http.get(`http://localhost:3030/${optionType}`, async () => {
        return new HttpResponse(null, { status: 500 });
      })
    )
  );

  render(appRoutes, routerOpts);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
    alerts.forEach((alert) =>
      expect(alert).toHaveTextContent(ORDER_ENTRY_ALERT_MESSAGE)
    );
  });
});
