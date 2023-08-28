import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/store";
import { ChangeEvent } from "react";
import { ICustomer } from "../../../Models/Customers";

interface FirstPageProps {
  customer: ICustomer;
  handleChangeCustomer(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
}
export default function FirstPage({
  customer,
  handleChangeCustomer,
}: FirstPageProps) {
  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    width: "1000px",
    height: "456px",
  };
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );

  return (
    <div>
      <FormControl>
        <Grid>
          <Paper elevation={0} sx={paperStyle}>
            <Typography
              sx={{
                margin: "0 auto",
                marginTop: "60px",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              Izaberite kupca
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                sx={{
                  width: "20rem",
                  marginTop: "50px",
                }}
                label="Kupac"
                select
                value={customer.id}
                defaultValue=""
                onChange={(event) => handleChangeCustomer(event)}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    <option style={{ fontSize: "20px" }}>
                      {customer.name} {customer.lastName}
                    </option>
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Paper>
        </Grid>
      </FormControl>
    </div>
  );
}
