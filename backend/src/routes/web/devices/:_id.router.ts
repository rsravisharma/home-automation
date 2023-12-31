
import { Router } from "express";
import PaginateHelper from "./../../../lib/PaginateHelper";
import Device from "./../../../models/schemas/Device";
export const options = {
    isSecure: true,
    role: "user",
}

const router = Router({ mergeParams: true });

router.get("/", async (req: any, res) => {
    const _id = req.params._id;
    const device = await Device.findById(_id);
    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            device: device
        }
    })
})

router.put("/", async (req: any, res) => {
    const _id = req.params._id;
    const device = await Device.findOneAndUpdate({ _id: _id }, { $set: { ...req.body } }, { new: true });

    //update to device
    const mqtt_client = req.app.get("mqtt");
    const topic = `device/${device?._id.toString()}/pins/config`;
    console.log("Topic is::", topic);
    mqtt_client.publish(topic, JSON.stringify(device?.pins))
    //update to device

    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            device: device
        }
    })
})


export default router;
