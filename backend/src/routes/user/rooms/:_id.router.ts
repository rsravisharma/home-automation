
import { Router } from "express";
import Room from "./../../../models/schemas/Room";
export const options = {
    isSecure: true,
    role: "user",
}

const router = Router({ mergeParams: true });

router.get("/", async (req: any, res) => {
    const _id = req.params._id;
    const room = await Room.findById(_id);
    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            room: room
        }
    })
})

router.put("/", async (req: any, res) => {
    const _id = req.params._id;
    const room = await Room.findOneAndUpdate({ _id: _id }, { $set: { ...req.body } }, { new: true });

    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            room: room
        }
    })
})


export default router;
