import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./customerProfile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/store";
import InvoiceCatalogueContent from "../../Catalogue/InvoiceCatalogueContent";
import { IInvoice } from "../../../Models/Invoice";
import img from "../../../Assets/Client.png";
import { useParams } from "react-router-dom";
interface CustomerProfileProps {
  selectInvoice(invoice: IInvoice | null): void;
}

export default function CustomerProfile({
  selectInvoice,
}: CustomerProfileProps) {
  const customersInRedux = useSelector(
    (state: RootState) => state.customers.customers
  );
  const invoicesInRedux = useSelector(
    (state: RootState) => state.invoices.invoices
  );
  const params = useParams();
  const id = +params.id!;
  const customer = customersInRedux.find((c) => c.id === id);

  const customerInvoiceIds = customer?.invoices || [];
  const customerInvoices = invoicesInRedux.filter((invoice) =>
    customerInvoiceIds.includes(invoice.id!)
  );

  return (
    <>
      <div className="profile-container">
        <Card className="profile-card">
          <CardContent>
            <div className="image-and-name">
              <CardMedia image={img} />
              <Typography variant="h5">
                {customer?.name} {customer?.lastName}
              </Typography>
            </div>

            <Card className="customer-details">
              <Typography color="text.secondary">
                Ulica: {customer?.address}
              </Typography>
              <Typography color="text.secondary">
                Broj lične karte: {customer?.presonalNumber}
              </Typography>
              <Typography color="text.secondary">
                JMBG: {customer?.uniqueCitizens}
              </Typography>
            </Card>
          </CardContent>
        </Card>
        <Card className="invoice-card">
          {customerInvoices.length > 0 ? (
            <InvoiceCatalogueContent
              selectInvoice={selectInvoice}
              customerInvoices={customerInvoices}
            />
          ) : (
            <Typography className="not-found">Nema računa</Typography>
          )}
        </Card>
      </div>
    </>
  );
}
