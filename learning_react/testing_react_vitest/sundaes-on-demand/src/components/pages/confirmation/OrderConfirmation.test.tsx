import OrderConfirmation from "./OrderConfirmation";
import { render, screen } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";
import { ORDER_ENTRY_ALERT_MESSAGE } from "../../../constants";

const routerOpts = {
  initialEntries: ["/"],
};

const routes = [{ path: "/", element: <OrderConfirmation /> }];

test("display error message if order sent unsuccessfully", async () => {
  // Make MSW return error from the confirmation endpoint.
  server.resetHandlers(
    http.get(`"http://localhost:3030/order"`, async () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
  render(routes, routerOpts);

  // Expect the error message to be shown.
  const errorMsg = await screen.findByRole("alert");
  expect(errorMsg).toHaveTextContent(ORDER_ENTRY_ALERT_MESSAGE);
});
