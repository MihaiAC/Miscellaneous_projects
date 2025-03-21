import { http, HttpResponse, delay } from "msw";
import {
  SAMPLE_SCOOPS,
  SAMPLE_TOPPINGS,
  CONFIRMATION_RESPONSE,
} from "../test-utils/testingConstants";

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    return HttpResponse.json(SAMPLE_SCOOPS);
  }),
  http.get("http://localhost:3030/toppings", () => {
    return HttpResponse.json(SAMPLE_TOPPINGS);
  }),
  http.post("http://localhost:3030/order", async () => {
    await delay(100);
    return HttpResponse.json(CONFIRMATION_RESPONSE, { status: 201 });
  }),
  http.get(`http://localhost:3030/${SAMPLE_SCOOPS[0].imagePath}`, () => {
    const imageBlob = new Blob(["mocked image data"], { type: "/image/png" });

    return new HttpResponse(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  }),
];
