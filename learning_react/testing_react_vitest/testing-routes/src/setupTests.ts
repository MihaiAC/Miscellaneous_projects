import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import server from "./mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset handlers after each test so they won't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up.
afterAll(() => server.close());
