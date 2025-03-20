import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://dummyjson.com/carts/1", () => {
    return HttpResponse.json({
      id: 1,
      products: [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
      ],
    });
  }),
];
