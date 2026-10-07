import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import path from "node:path";
import invoices from "./invoice.route.ts";

const app = express();

const dist = path.join(import.meta.dirname, "..", "web", "dist");

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method}${req.url}`);
  next();
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json(invoices);
});

app.use("/api/invoices", invoices);

app.use(express.static(dist));

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Recurso não encontrado" });
});

app.listen(Number(process.env.PORT) || 3000);
