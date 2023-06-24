import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/schemas/User";

const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const userCheck = await User.findOne({ $or: [
        {username: username },
        {email: email },
    ]});

    if (userCheck) return res.status(400).json({
        resultCode: "DUPLICATE_USER",
        message: "Another account already exist with same email or username"
    })


    const user = new User({
        name,
        email,
        username,
        password: bcrypt.hashSync(password, 10),

    });

    await user.save();
   


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
