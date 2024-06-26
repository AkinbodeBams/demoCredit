import { generateToken } from "../src/reusables/functions";

describe("generateToken", () => {
  it("should generate a token with the correct format", () => {
    const bvn = "12345678901";
    const token = generateToken(bvn);
    const [tokenBvn, expirationEpoch] = token.split("-");

    expect(tokenBvn).toBe(bvn);
    expect(Number(expirationEpoch)).toBeGreaterThan(Date.now());
  });

  it("should generate a token that expires in 20 minutes", () => {
    const bvn = "12345678901";
    const token = generateToken(bvn);
    const expirationEpoch = Number(token.split("-")[1]);
    const twentyMinutesInMs = 20 * 60 * 1000;

    expect(expirationEpoch).toBeGreaterThanOrEqual(
      Date.now() + twentyMinutesInMs - 1000
    );
    expect(expirationEpoch).toBeLessThanOrEqual(
      Date.now() + twentyMinutesInMs + 1000
    );
  });
});
