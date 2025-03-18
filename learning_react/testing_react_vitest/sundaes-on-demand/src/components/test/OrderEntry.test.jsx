import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import { ORDER_ENTRY_ALERT_MESSAGE } from "../../constants";

// TODO: Should have a constants.ts file to avoid hardcoding
// strings.
test("handles error for scoops and toppings routes", async () => {
  // Override handlers to return error response.
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", async () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert", {
    name: ORDER_ENTRY_ALERT_MESSAGE,
  });

  expect(alerts).toHaveLength(2);
});
