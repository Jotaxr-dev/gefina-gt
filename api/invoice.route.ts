import type { Request, Response } from "express";
import { Router } from "express";
import invoices from "./invoice.data.ts";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(invoices);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  for (let i = 0; i < invoices.length; i++) {
    if (invoices[i].id === id) {
      res.status(200).json(invoices[i]);
      return;
    }
  }

  return res
    .status(404)
    .json({ error: { message: "Fatura não encontrada" } });
});

export default router;
