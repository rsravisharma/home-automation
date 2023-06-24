import { Router } from "express";

const router = Router({mergeParams: true});

router.get("/", (req, res)=>res.json({}))

export default router;
