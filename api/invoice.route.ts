import type { Request, Response } from "express";
import { Router } from "express";
import { findAllInvoices, findInvoiceById, insertInvoice, modifyInvoice, removeInvoice } from "./invoice.service.ts";




const router = Router();

router.get("/", async (_req: Request, res: Response) => {
   const invoices = await findAllInvoices();
    res.status(200).json(invoices);
});

router.get("/:id", async (req, res) => {

  const id = Number(req.params.id);

    const invoice = await findInvoiceById(id);

    if (!invoice) {
      res.status(404).json({
        error: {
          status: 404,
          message: "Fatura não encontrada."
        }
      })
    }

    res.status(200).json(invoice);
});

router.post("/", async (req: Request, res: Response) => {
 const invoice = await insertInvoice(req.body);

    if (!invoice) res.status(404).json({
      error: {
        status: 404,
        message: "Fatura não encontrada."
      }
    })

    res.status(201).json(invoice);
});

router.put('/:id', async (req, res) => {
  console.log(req.body)
  const invoice = await modifyInvoice(
      Number(req.params.id),
      req.body
    );

    if(!invoice) res.status(404).json({ error: {
      status: 404,
      message: 'Fatura não encontrada.'
    }});

    res.status(200).json(invoice);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const deleted = await removeInvoice(Number(req.params.id));

 if(!deleted) res.status(404).json({error: {
  status: 404,
  message: "Fatura não encontrada."
 }})
})

export default router;
