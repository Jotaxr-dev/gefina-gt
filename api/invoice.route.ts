import type { Request, Response } from "express";
import { Router } from "express";
import { findAllInvoices, findInvoiceById, insertInvoice, modifyInvoice, removeInvoice } from "./invoice.service.ts";




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

router.get("/:id", async (req, res) => {

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
    }

    res.status(200).json(invoice);

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

router.post("/", async (req: Request, res: Response) => {
  try {
    const invoice = await insertInvoice(req.body);

    if (!invoice) res.status(404).json({
      error: {
        status: 404,
        message: "Fatura não encontrada."
      }
    })

    res.status(201).json(invoice);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: {
        status: 500,
        message: "Não foi possível inserir fatura."
      }
    });
  }
});

router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const invoice = await modifyInvoice(
      Number(req.params.id),
      req.body
    );

    if(!invoice) res.status(404).json({ error: {
      status: 404,
      message: 'Fatura não encontrada.'
    }});

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: {
      status: 500,
      message: 'Não foi possível modificar fatura.'
    }});
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
 const deleted = await removeInvoice(Number(req.params.id));

 if(!deleted) res.status(404).json({error: {
  status: 404,
  message: "Fatura não encontrada."
 }})
  } catch (error) {
    console.error(error);
    res.status(500).json({error: {
      status: 500,
      message: 'Não foi possível remover fatura.'
    }})
  }
})

export default router;
