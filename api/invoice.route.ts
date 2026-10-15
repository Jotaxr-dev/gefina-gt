import type { Request, Response } from "express";
import { Router } from "express";
import {findAllInvoices, findInvoiceById} from "./invoice.service.ts";
import { error } from "node:console";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const invoices = await findAllInvoices();
  res.status(200).json(invoices);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const invoice = await findInvoiceById(id);

  if(!invoice) {
    res.status(404).json({
      error: {
        status: 404,
        message: "Fatura não encontrada."
      }
    })
    res.status(200).json(invoice);
  }
});

export default router;
