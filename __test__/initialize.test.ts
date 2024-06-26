import dotenv from "dotenv";
dotenv.config();
import app from "../src/app";
import { initializeDatabase } from "../src/database";
import { configureEnv } from "../src/envStore";
import { setupApp } from "../src/reusables";
import initialize from "../src/initialize";

jest.mock("../src/database", () => ({
  initializeDatabase: jest.fn(),
}));

jest.mock("../src/envStore", () => ({
  configureEnv: jest.fn(),
}));

jest.mock("../src/reusables", () => ({
  setupApp: jest.fn(),
}));

describe("Initialize", () => {
  it("should initialize the application successfully", async () => {
    const mockBody = jest.fn();
    await initialize(mockBody);
    expect(configureEnv).toHaveBeenCalled();
    expect(initializeDatabase).toHaveBeenCalled();
    expect(setupApp).toHaveBeenCalledWith(app);
    expect(mockBody).toHaveBeenCalled();
  });
});
