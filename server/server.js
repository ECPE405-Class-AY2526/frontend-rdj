import express from "express";
const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  res.json({ message: "I hear you!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
