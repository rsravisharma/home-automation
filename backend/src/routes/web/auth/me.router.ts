import { Router } from "express";
import User from "../../../models/schemas/User";
import TokenManager from "../../../lib/TokenManager";
const router = Router({ mergeParams: true });
export const options = {
    isSecure: true, 
    role: "user",
    platform: "web"
}

router.get("/", async (req: any, res: any) => {
    const aToken = req.header("authorization");
    const payload: any = TokenManager.verifyAccessToken(aToken);
    console.log('the payload is ', payload);
    if (!payload) return res.status(401).json({
        resultCode: "INVALID_ACCESS_TOKEN",
        message: "Invalid Access token"
    })
    const user = await User.findOne({ _id: payload._id });
    res.status(200).json({
        resultCode: 200,
        message: "Successful",
        data: user
    })
});

export default router;
