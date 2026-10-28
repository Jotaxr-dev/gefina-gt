import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import path from "node:path";
import fs from "node:fs";
import pool from "./database.ts";
import dashboard from "./dashboard.route.ts";
import invoices from "./invoice.route.ts";
import handleError from "./error.middleware.ts";



const app = express();
app.use(express.json());

const dist = path.join(import.meta.dirname, "..", "web", "dist");

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method}${req.url}`);
  next();
});

app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    const connect = await pool.query("SELECT datname FROM pg_database WHERE oid = 5;");
    res.status(200).json({
      status: "Server is running.",
      database: connect.rows[0].datname
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "Server is running.",
      database: "Unvaliable"
    })
  }
});

app.use("/api/dashboard", dashboard);
app.use("/api/invoices", invoices);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.startsWith("/api") || !fs.existsSync(path.join(dist, "index.html"))) {
    next();
    return;
  }

  res.sendFile(path.join(dist, "index.html"));
})

app.use(express.static(dist));

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: {
      status: 404,
      message: "Recurso não encontrado"
    }
  });
});

app.use(handleError)

app.listen(Number(process.env.PORT) || 3000);
