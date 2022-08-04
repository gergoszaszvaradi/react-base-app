import { User, UserCreationDto } from "common/models/user";
import express from "express";

const router = express.Router();

const users : User[] = [
    {
        id: 0,
        email: "george.bluth@reqres.in",
        firstName: "George",
        lastName: "Bluth",
    },
];

router.get("/", (req, res) => res.json(users));

router.post("/", (req : express.Request<{}, User, UserCreationDto>, res) => {
    console.log(req.body);
    const user : User = {
        id: users.length,
        ...req.body,
    };
    users.push(user);
    res.json(user);
});

export default router;
