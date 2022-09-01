import express from "express";
import { client } from "./db";
import cors from "cors";

//middleware
const app = express();
app.use(express.json());
app.use(cors());

async function execute() {
  await client.connect();
}

execute();

//Get all projects
app.get("/", async (req, res) => {
  const results = await client.query("SELECT * FROM projects");
  res.json(results.rows);
});

//Get one project
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await client.query("SELECT * FROM projects WHERE id = $1", [
    id,
  ]);
  res.json(results.rows);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
