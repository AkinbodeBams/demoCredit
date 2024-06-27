import supertest from "supertest";
import app from "../src/app";
import initialize from "../src/initialize";

const server = supertest.agent(app);

const initTests = async () => {
  await new Promise<void>((resolve) => {
    initialize(resolve);
  });
};

beforeAll(async () => {
  await initTests();
});

describe("Server Setup", () => {
  describe("GET /health-status", () => {
    it("should return 200 response", async () => {
      const res = await server.get("/health-status");
      expect(res.status).toBe(200);
      expect(res.body.data.message).toBe("Health check");
    });
  });

  describe("Invalid Route", () => {
    it("should display 404 error", async () => {
      const res = await server.get("/invalid/route");
      expect(res.status).toBe(404);
    });
  });
});
