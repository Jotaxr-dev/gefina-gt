import { Router } from "express";

import findDashbord from "./dashboard.service.ts";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const dashboard = await findDashbord();

        res.status(200).json(dashboard);
    } catch (error) {
        console.log(error);

        res.status(500).json({error: {
            message: "Não foi possível carregar o painel inicial."
        }})
    }
});


export default router;