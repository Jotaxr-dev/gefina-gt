import type { InvoiceSituation } from "./invoiceType.ts";

export default function situationLabel(situation: InvoiceSituation) {
    return situation === "paid" ? "Pago" : situation === "overdue" ? "atrasado" : "pendente";
}