import express from "express";
import { client } from "./db";
import cors from "cors";
import dotenv from "dotenv";

//middleware
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT_NUMBER = process.env.PORT ?? 4000;

//Get all projects
app.get("/", async (req, res) => {
  await client.connect();
  const results = await client.query("SELECT * FROM projects");
  res.json(results.rows);
  await client.end();
});

//Get one project
app.get("/:id", async (req, res) => {
  await client.connect();
  const { id } = req.params;
  const results = await client.query("SELECT * FROM projects WHERE id = $1", [
    id,
  ]);
  res.json(results.rows);
  await client.end();
});

app.listen(PORT_NUMBER, () => {
  console.log(`listening on port ${PORT_NUMBER}`);
});
