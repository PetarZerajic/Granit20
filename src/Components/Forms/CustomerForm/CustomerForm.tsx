import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormControl, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { ICustomer } from "../../../Models/Customers";
import { CustomerService } from "../../../Services/CustomerService";
import { Spinner } from "../../Spinner/Spinner";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "500px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },

  "& .MuiFormControl-root": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiTextField-root": {
    width: "350px",
    marginTop: "20px",
  },

  "& .MuiInputBase-root": {
    width: "100%",
  },
}));

interface CustomerTitleProps {
  children?: React.ReactNode;
  closeForm(): void;
}

const FormTitle = (props: CustomerTitleProps) => {
  const { children, closeForm } = props;
  return (
    <DialogTitle
      sx={{ margin: "0 auto", fontSize: "45px", fontFamily: "sans-serif" }}
    >
      {children}
      {closeForm ? (
        <IconButton
          aria-label="close"
          onClick={closeForm}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface CustomerFormProps {
  openForm: { customer: boolean };
  initialCustomer: ICustomer | null;
  handleCreateCustomerAlert(): void;
  closeForm(): void;
}

export default function CustomerForm(props: CustomerFormProps) {
  const { openForm, initialCustomer, handleCreateCustomerAlert, closeForm } =
    props;

  const [customer, setCustomer] = useState<ICustomer>(
    initialCustomer ?? {
      name: "",
      lastName: "",
      address: "",
      presonalNumber: "",
      uniqueCitizens: "",
    }
  );
  const [isUnsuccessful, setIsUnSuccessful] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addNewCustomer, updateCustomer } = CustomerService();
  const onSubmit = async () => {
    setLoading(true);
    let isSuccess: boolean | undefined = false;

    if (initialCustomer !== null) {
      isSuccess = await updateCustomer(customer);
    } else {
      isSuccess = await addNewCustomer(customer);
    }
    if (isSuccess) {
      closeForm();
      handleCreateCustomerAlert();
      return true;
    } else {
      setIsUnSuccessful(true);
      setLoading(false);
      return false;
    }
  };
  const setCustomerInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setCustomer({
      ...customer,
      [name]: value,
    });
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  };
  const IsRequiredFilled = (): Boolean => {
    return (
      customer.name !== "" &&
      customer.name !== undefined &&
      customer.lastName !== "" &&
      customer.lastName !== undefined &&
      customer.address !== "" &&
      customer.address !== undefined &&
      customer.presonalNumber !== "" &&
      customer.presonalNumber !== undefined &&
      customer.uniqueCitizens !== "" &&
      customer.uniqueCitizens !== undefined
    );
  };
  const message = () => {
    let customerlAdd = "";
    let customerUpdated = "";

    if (initialCustomer !== null) {
      customerUpdated = "ažuriran";
      return customerUpdated;
    } else {
      customerlAdd = "dodat";
      return customerlAdd;
    }
  };
  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openForm.customer}
      >
        <FormTitle closeForm={closeForm}>Kupac</FormTitle>

        <DialogContent id="Dialog description" dividers>
          <Grid>
            <Paper elevation={0}>
              <FormControl>
                <TextField
                  label="Ime"
                  placeholder="Milan,Petar,Milica... "
                  name="name"
                  value={customer.name}
                  required={customer.name!.length === 0}
                  autoComplete="off"
                  onKeyDown={handleOnKeyDown}
                  onChange={setCustomerInputValue}
                  error={customer.name === undefined || customer.name === ""}
                />

                <TextField
                  label="Prezime"
                  placeholder="Jovanovic,Mirkovic... "
                  name="lastName"
                  value={customer.lastName}
                  required={customer.lastName!.length === 0}
                  autoComplete="off"
                  onKeyDown={handleOnKeyDown}
                  onChange={setCustomerInputValue}
                  error={
                    customer.lastName === undefined || customer.lastName === ""
                  }
                />
                <TextField
                  label="Adresa"
                  placeholder="Obilićev venac 18a, Terazije"
                  name="address"
                  value={customer.address}
                  required={customer.address!.length === 0}
                  autoComplete="off"
                  onChange={setCustomerInputValue}
                  error={
                    customer.address === undefined || customer.address === ""
                  }
                />
                <TextField
                  label="Broj lične karte"
                  placeholder="95155646 "
                  name="presonalNumber"
                  value={customer.presonalNumber}
                  required={customer.presonalNumber!.length === 0}
                  autoComplete="off"
                  type="number"
                  onChange={setCustomerInputValue}
                  error={
                    customer.presonalNumber === undefined ||
                    customer.presonalNumber === ""
                  }
                />
                <TextField
                  label="JMBG"
                  placeholder="0101990360007 "
                  name="uniqueCitizens"
                  value={customer.uniqueCitizens}
                  required={customer.uniqueCitizens!.length === 0}
                  autoComplete="off"
                  type="number"
                  onChange={setCustomerInputValue}
                  error={
                    customer.uniqueCitizens === undefined ||
                    customer.uniqueCitizens === ""
                  }
                />
                <p
                  style={{
                    color: "#b71c1c",
                    fontSize: "18px",
                  }}
                >
                  {isUnsuccessful &&
                    `Problem sa serverom.Kupac neuspešno ${message()} `}
                </p>
                <Button
                  sx={{ width: "200px", height: "35px", marginTop: "10px" }}
                  type="submit"
                  color="primary"
                  variant="outlined"
                  disabled={!IsRequiredFilled() || loading}
                  onClick={onSubmit}
                >
                  {loading ? <Spinner size={30} /> : "Potvrdi"}
                </Button>
              </FormControl>
            </Paper>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
