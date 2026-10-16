import type { Request, Response } from "express";
import { Router } from "express";
import { findAllInvoices, findInvoiceById } from "./invoice.service.ts";


const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const invoices = await findAllInvoices();
    res.status(200).json(invoices);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: {
        status: 500,
        message: "Não foi possível carregar as faturas."
      }
    })
  }
});

router.get("/:id", async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.id);

    const invoice = await findInvoiceById(id);

    if (!invoice) {
      res.status(404).json({
        error: {
          status: 404,
          message: "Fatura não encontrada."
        }
      })
      res.status(200).json(invoice);
    }

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: {
        status: 500,
        message: "Não foi possível carregar as faturas."
      }
    })
  }
});

export default router;
