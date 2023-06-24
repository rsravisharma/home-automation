import { Router } from "express";

const router = Router({mergeParams: true});

router.get("/", (req : any, res : any)=>{
    const io = req.app.get("io");
    io.emit("message", "Hello I'm running....");
    console.log(io);
    res.json({
        resultCode: "SUCCESS",
        message: "Application is runniing...."
    })
})

export default router;
