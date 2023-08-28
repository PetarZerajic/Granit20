import { IInvoiceArticle } from "./InvoiceArticle";

export interface IInvoice {
  id?: number;
  code?: string;
  articles?: IInvoiceArticle[];
  dateExecution?: string;
  totalPriceBill?: number;
}
