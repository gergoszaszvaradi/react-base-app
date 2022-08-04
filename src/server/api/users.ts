import { User } from "common/models/user";
import express from "express";

import UserModel from "../db/models/user";

const router = express.Router();

router.get("/", async (req, res) => res.json(await UserModel.find()));

router.post("/", async (req : express.Request<{}, unknown, User>, res) => {
    const user = await new UserModel(req.body).save();
    res.json(user);
});

export default router;
