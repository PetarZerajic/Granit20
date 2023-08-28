import { useSelector } from "react-redux";
import { ICustomer } from "../../../../Models/Customers";
import CustomersCatalogueContent from "../../../Catalogue/CustomersCatalogueContent";
import { RootState } from "../../../../Redux/Store/store";
import "./customerCatalogue.css";
import { Tooltip } from "@mui/material";

interface CustomerProps {
  toggleView: { customer: boolean };
  selectCustomer(cust: ICustomer | null): void;
}
export default function CustomerCatalogue({
  toggleView,
  selectCustomer,
}: CustomerProps) {
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  return (
    <>
      {customers.length > 0 ? (
        <CustomersCatalogueContent
          toggleView={toggleView}
          selectCustomer={selectCustomer}
        />
      ) : (
        <h1>
          {customers.length === 0 ? "Ne postoji ni jedan kupac" : undefined}
        </h1>
      )}
      <Tooltip title="Dodaj kupca" placement="top">
        <div className="button-container">
          <button
            className="button-customer"
            onClick={() => selectCustomer(null)}
          />
        </div>
      </Tooltip>
    </>
  );
}
