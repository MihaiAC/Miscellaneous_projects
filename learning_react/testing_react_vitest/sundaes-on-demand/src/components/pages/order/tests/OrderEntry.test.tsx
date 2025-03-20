import { render, screen } from "../../../../test-utils/testing-library-utils";
import { http, HttpResponse } from "msw";
import { server } from "../../../../mocks/server";
import { ORDER_ENTRY_ALERT_MESSAGE } from "../../../../constants";
import { OptionType } from "../../../types/types";
import { appRoutes } from "../../../../router/routerConfig";

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

  const routerOpts = {
    initialEntries: ["/"],
  };

  render(appRoutes, routerOpts);

  const alerts = await screen.findAllByRole("alert");
  for (const alert of alerts) {
    expect(alert).toHaveTextContent(ORDER_ENTRY_ALERT_MESSAGE);
  }

  expect(alerts).toHaveLength(2);
});
