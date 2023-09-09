import { IInvoice } from "../../Models/Invoice";
import { Box, Grid } from "@mui/material";
import { InvoiceCard } from "../Cards/InvoiceCard/InvoiceCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/store";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import DrawerComponent from "../Drawer/DrawerComponent";

interface InvoiceCatalogueProps {
  selectInvoice(invoice: IInvoice | null): void;
  customerInvoices?: IInvoice[];
}
export default function InvoiceCatalogueContent({
  selectInvoice,
  customerInvoices,
}: InvoiceCatalogueProps) {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentInvoice, setCurrentInvoice] = useState<IInvoice>();

  const openDrawer = (invoice: IInvoice) => {
    setIsOpen(true);
    setCurrentInvoice(invoice);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };
  const { fromCard } = location.state || {
    fromCard: false,
  };
  const invoicesInRedux = useSelector(
    (state: RootState) => state.invoices.invoices
  );

  const invoices = fromCard ? customerInvoices! : invoicesInRedux;

  return (
    <Box padding={6}>
      <Grid container spacing={4}>
        {invoices.map((invoice) => {
          return (
            <Grid key={invoice.id} item>
              <InvoiceCard
                invoice={invoice}
                selectInvoice={selectInvoice}
                openDrawer={openDrawer}
              />
            </Grid>
          );
        })}
        {currentInvoice && (
          <DrawerComponent
            isOpen={isOpen}
            invoice={currentInvoice}
            closeDrawer={closeDrawer}
          />
        )}
      </Grid>
    </Box>
  );
}
