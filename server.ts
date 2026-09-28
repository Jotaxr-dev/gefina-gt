import { createServer } from "node:http";
import send from "./send.ts";

createServer((request, response) => {
    if (request.url !== "api/health") {
       return send(response, 404, { message: "Recurso não encontrado" });       
    }
   send(response, 200, { status: "ok" })
}).listen(3000);

