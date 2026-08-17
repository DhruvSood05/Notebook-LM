import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

async function main() {
  app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
  });
}

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

main();
