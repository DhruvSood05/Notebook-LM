// Consolas, 'Courier New', monospace
import express from "express";

const app = express();

async function main() {
  app.listen(3000, () => {
    console.log("Server is listening on port: 3000");
  });
}

main();
