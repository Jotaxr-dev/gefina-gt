import type { InvoiceSituation } from "./invoiceType.ts";

export function situationLabel(situation: InvoiceSituation) {
    return situation === "paid" ? "Pago" : situation === "overdue" ? "atrasado" : "pendente";
}

export function formateCurrency(cents: number): string {
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"

    });

    return formatter.format(cents / 100);
}

export function formateDate(isoDate: string): string {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return formatter.format(new Date(`${isoDate}T00:00:00`));
}