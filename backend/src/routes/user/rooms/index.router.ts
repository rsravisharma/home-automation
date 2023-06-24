
import { Router } from "express";
import PaginateHelper from "./../../../lib/PaginateHelper";
import Room from "./../../../models/schemas/Room";
export const options = {
    isSecure: true,
    role: "user",
}

const router = Router({ mergeParams: true });

router.post("/", async (req : any, res)=>{
    const query = PaginateHelper.query(req);
    const options = PaginateHelper.options(req);

    const rooms = await Room.find(query, null, options);
    const count = await Room.count(query);
    return res.json({
        result: {
            records: rooms,
            count: count,
            page: req.params.page || 1
        }
    })
})

router.put("/", async (req: any, res) => {
    const room = new Room({...req.body});
    await room.save();

    //
    
    //
    return res.json({
        result: {
            resultCode: "SUCCESS",
            message: "Successful",
            room: room
        }
    });
})


export default router;
