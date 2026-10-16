import type { Invoice } from "./invoiceType.ts"
import {
    situationLabel,
    formateCurrency,
    formateDate,} from "./utils.ts";

interface InvoiceRowProps {
    invoice: Invoice;
}

export default function InvoiceRow(props: InvoiceRowProps) {
    return (
        <>
        <tr>
            <td>{props.invoice.customer.name}</td>
            <td>{formateCurrency(props.invoice.amount)}</td>
            <td>{formateDate(props.invoice.issueDate)}</td>
            <td>{formateDate(props.invoice.dueDate)}</td>
            <td>{situationLabel(props.invoice.situation)}</td>
        </tr>
        </>
    )
}