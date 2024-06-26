import http from "http";
import app from "../src/app";
import request from "supertest";

describe("Server", () => {
  let server: http.Server;

  beforeAll(() => {
    server = http.createServer(app);
  });

  it("should listen on the correct port", (done) => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      const addr = server.address();
      expect(typeof addr).toBe("object");
      expect((addr as any).port).toBe(Number(port));
      server.close(done);
    });
  });

  it("should handle unhandled rejections", () => {
    process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
      expect(reason).toBeDefined();
    });
    process.emit(
      "unhandledRejection",
      new Error("Test error"),
      Promise.resolve()
    );
  });

  describe("should handle invalid url", () => {
    it("should respond with 404 for an invalid URL", async () => {
      const response = await request(app).get("/invalid-url");
      expect(response.status).toBe(404);
    });
  });
});
