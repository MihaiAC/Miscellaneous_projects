import { http, HttpResponse } from "msw";
import { SAMPLE_SCOOPS, SAMPLE_TOPPINGS } from "../test-utils/testingConstants";

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    return HttpResponse.json(SAMPLE_SCOOPS);
  }),
  http.get("http://localhost:3030/toppings", () => {
    return HttpResponse.json(SAMPLE_TOPPINGS);
  }),
];
