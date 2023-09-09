import React, { useState } from "react";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { IInvoice } from "../../../Models/Invoice";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/store";
import { InvoiceService } from "../../../Services/InvoiceService";
import "./invoiceCard.css";

interface InvoiceCardProps {
  invoice: IInvoice;
  selectInvoice(invoice: IInvoice | null): void;
  openDrawer(invoice: IInvoice): void;
}

export const InvoiceCard = (props: InvoiceCardProps) => {
  const { invoice, selectInvoice, openDrawer } = props;

  const { deleteinvoice } = InvoiceService();
  const handleDeleteInvoice = () => {
    deleteinvoice(invoice);
  };
  const articleInRedux = useSelector(
    (state: RootState) => state.articles.articles
  );
  const customerInRedux = useSelector(
    (state: RootState) => state.customers.customers
  );
  const customer = customerInRedux.find((cust) =>
    cust.invoices?.includes(invoice.id!)
  );
  const customerName = customer?.name || "Greska";
  const customerLastName = customer?.lastName || "kupac ne postoji";
  const statusColor = customer ? "inherit" : "#b71c1c";

  const articles = invoice.articles!.map((article) => {
    const articleTitle = articleInRedux.find(
      (art) => art.id === article.articleId
    )?.title;
    return articleTitle;
  });

  return (
    <div className="Invoice">
      <Card className="Card">
        <CardActionArea onClick={() => openDrawer(invoice)}>
          <CardContent>
            <Typography
              className="title"
              gutterBottom
              variant="h5"
              component="h2"
              sx={{ color: statusColor }}
            >
              {`${customerName} ${customerLastName}`}
            </Typography>
            <Typography
              className="articles"
              variant="body2"
              color="text.secondary"
            >
              Artikli: {articles!.join(",")}
            </Typography>
            <Typography
              className="price"
              variant="body2"
              color="text.secondary"
            >
              {invoice.totalPriceBill} din
            </Typography>
            <Typography className="date" variant="body2" color="text.secondary">
              Datum: {invoice.dateExecution}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions className="actions">
          <Button
            className="button"
            size="small"
            variant="contained"
            color="primary"
            onClick={() => selectInvoice(invoice)}
          >
            Ažuriraj
          </Button>
          <Button
            className="button"
            color="error"
            size="small"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteInvoice}
          >
            Izbriši
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
