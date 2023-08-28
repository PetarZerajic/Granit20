import InvoiceCatalogueContent from "../../../Catalogue/InvoiceCatalogueContent";
import { IInvoice } from "../../../../Models/Invoice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store/store";
import "./invoiceCatalogue.css";
import { Tooltip } from "@mui/material";

interface InvoiceProps {
  selectInvoice(invoice: IInvoice | null): void;
}

export default function InvoiceCatalogue({ selectInvoice }: InvoiceProps) {
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  return (
    <>
      {invoices.length > 0 ? (
        <InvoiceCatalogueContent selectInvoice={selectInvoice} />
      ) : (
        <h1>
          {invoices.length === 0 ? "Ne postoji ni jedan račun" : undefined}
        </h1>
      )}

      <div>
        <Tooltip title="Dodaj racun" placement="top">
          <div className="button-container">
            <button
              className="button-invoice"
              onClick={() => selectInvoice(null)}
            />
          </div>
        </Tooltip>
      </div>
    </>
  );
}
