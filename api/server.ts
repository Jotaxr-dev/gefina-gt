import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import invoices from "./invoice.route.ts";

const app = express();

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method}·${req.url}`);
  next();
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json(invoices);
});

app.use("api/invoices", invoices);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Recurso não encontrado" });
});

app.listen(3000);
