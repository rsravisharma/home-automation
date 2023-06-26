import { Router } from "express";
import User from "../../../models/schemas/User";
import TokenManager from "../../../lib/TokenManager";
const router = Router({ mergeParams: true });
export const options = {
    isSecure: true, 
    role: "user",
    platform: "web"
}
router.post("/", async (req: any, res) => {
    return res.json({
        resultCode: "SUCCESS",
        message: "Successful",
    })


})



export default router;
