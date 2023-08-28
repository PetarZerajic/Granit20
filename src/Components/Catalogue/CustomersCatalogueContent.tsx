import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/store";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { CustomerCard } from "../Cards/CustomerCard/CustomerCard";
import { ICustomer } from "../../Models/Customers";
interface CustomersCatalogueProps {
  toggleView: { customer: boolean };
  selectCustomer(customer: ICustomer | null): void;
}

export default function CustomersCatalogueContent({
  toggleView,
  selectCustomer,
}: CustomersCatalogueProps) {
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );

  return (
    <Box padding={6}>
      <Grid container spacing={6}>
        {customers.map((customer) => {
          return (
            <Grid key={customer.id} item>
              <CustomerCard
                customer={customer}
                selectCustomer={selectCustomer}
                toggleView={toggleView}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
