import { IInvoice } from "../../Models/Invoice";
import { Box, Grid } from "@mui/material";
import { InvoiceCard } from "../Cards/InvoiceCard/InvoiceCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/store";
import { useLocation } from "react-router-dom";

interface InvoiceCatalogueProps {
  selectInvoice(invoice: IInvoice | null): void;
  customerInvoices?: IInvoice[];
}
export default function InvoiceCatalogueContent({
  selectInvoice,
  customerInvoices,
}: InvoiceCatalogueProps) {
  const location = useLocation();

  const { fromCard } = location.state || {
    fromCard: false,
  };
  const invoicesInRedux = useSelector(
    (state: RootState) => state.invoices.invoices
  );

  const invoices = fromCard ? customerInvoices! : invoicesInRedux;

  return (
    <Box padding={6}>
      <Grid container spacing={6}>
        {invoices.map((invoice) => {
          return (
            <Grid key={invoice.id} item>
              <InvoiceCard invoice={invoice} selectInvoice={selectInvoice} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
