import type { Request, Response } from "express";
import { Router } from "express";
import { findAllInvoices, findInvoiceById, insertInvoice, modifyInvoice, removeInvoice } from "./invoice.service.ts";




const router = Router();

function parseId(value: string): number | undefined {
  const id = Number(value);

  if (!Number.isInteger(id || id < 1)) return undefined;

  return id;
}

router.get("/", async (_req: Request, res: Response) => {
  const invoices = await findAllInvoices();
  res.status(200).json(invoices);
});

router.get("/:id", async (req, res) => {

  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({
      error: {
        status: 400,
        message: "Identificador inválido."
      }
    })
    return;
  }

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

  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({
      error: {
        status: 400,
        message: "Identificador inválido."
      }
    })
    return;
  }
  console.log(req.body)
  const invoice = await modifyInvoice(
   id,
   req.body
  );

  if (!invoice) res.status(404).json({
    error: {
      status: 404,
      message: 'Fatura não encontrada.'
    }
  });

  res.status(200).json(invoice);
});

router.delete("/:id", async (req, res) => {

  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({
      error: {
        status: 400,
        message: "Identificador inválido."
      }
    })
    return;
  }
  const deleted = await removeInvoice(id);

  if (!deleted) res.status(404).json({
    error: {
      status: 404,
      message: "Fatura não encontrada."
    }
  })
})

export default router;
