import "dotenv/config";
import express, { json, urlencoded } from "express";

require("express-async-errors");

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

export default app;
