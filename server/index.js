import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/Connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const PORT = 8088;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get("/", async (req, res) => {
  res.send("Hello From DALL-E! 👍 ");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`Server started 🙋   ↪  http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error, "🤕");
  }
};

startServer();
