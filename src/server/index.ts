import express from "express";
import dotenv from "dotenv";
import path from "path";

import userApi from "./api/users";

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const WEBAPP_DIR = path.join(process.cwd(), "dist", "webapp");

const app = express();
app.use(express.static(WEBAPP_DIR));
app.use(express.json());

app.use("/api/users", userApi);

app.get("/*", (req, res) => {
    res.sendFile("index.html", { root: WEBAPP_DIR });
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
