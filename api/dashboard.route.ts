import { Router } from "express";

import findDashbord from "./dashboard.service.ts";

const router = Router();

router.get("/", async (_req, res) => {
    const dashboard = await findDashbord();

        res.status(200).json(dashboard);
});


export default router;