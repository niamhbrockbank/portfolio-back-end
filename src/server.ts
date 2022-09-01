import express from "express";
import { client } from "./db";
import cors from "cors";
import dotenv from "dotenv";

//middleware
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT_NUMBER = process.env.PORT || 4000;

async function execute(){
  await client.connect()
}

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

app.listen(PORT_NUMBER, () => {
  console.log(`listening on port ${PORT_NUMBER}`);
});
