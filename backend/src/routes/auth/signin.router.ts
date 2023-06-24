import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/schemas/User";

const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username });

    if (!user) return res.status(400).json({
        resultCode: "INVALID_CREDENTIAL",
        message: "Please enter correct username or password"
    })

    if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({
        resultCode: "INVALID_CREDENTIAL",
        message: "Please enter correct username or password"
    })


    const token = jwt.sign({
        _id: user._id,
        iat: Math.floor(Date.now() / 1000) - 10000
    }, process.env.ACCESS_TOKEN_KEY || "");

    return res.json({
        resultCode: "SUCCESS",
        message: "Successful",
        result: {
            accessToken: token
        }
    })


})



export default router;
