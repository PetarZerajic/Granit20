export interface IInvoiceArticle {
  id?: number;
  articleId?: number;
  orderedQuantity?: number;
  price?: number;
}

export class InvoiceArticle implements IInvoiceArticle {
  id?: number;
  articleId?: number;
  orderedQuantity?: number;
  price?: number;
}
