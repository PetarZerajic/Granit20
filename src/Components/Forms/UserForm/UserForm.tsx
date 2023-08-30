import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { IconButton } from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import React, { FormEvent, useState } from "react";
import { IUserInfo } from "../../../Models/User";
import { useDispatch } from "react-redux";
import { addOneUser, updateOneUser } from "../../../Redux/Reducers/UsersSlice";
import logo_no_image from "../../../Assets/no-image-icon.jpg";

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
interface UserTitleProps {
  children?: React.ReactNode;
  closeForm(): void;
}

const UserTitle = (props: UserTitleProps) => {
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

interface UserFormProps {
  openForm: {
    user: boolean;
  };
  initialUser: IUserInfo | null;
  handleCreateUserAlert(): void;
  closeForm(): void;
}
export default function UserForm({
  openForm,
  initialUser,
  handleCreateUserAlert,
  closeForm,
}: UserFormProps) {
  const [user, setUser] = useState<IUserInfo>(
    initialUser ?? {
      id: { value: "" },
      name: { first: "", last: "" },
      location: {
        street: {
          number: 0,
          name: "",
        },
      },
      picture: {
        large: "",
      },
    }
  );
  const dispatch = useDispatch();
  const addUserToRedux = () => {
    user.id.value = Math.random().toString();
    dispatch(addOneUser(user));
  };
  const updateUserToRedux = () => {
    dispatch(updateOneUser(user));
  };
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (initialUser !== null) {
      updateUserToRedux();
      handleCreateUserAlert();
    } else {
      addUserToRedux();
      handleCreateUserAlert();
    }
    closeForm();
  };

  const setUserInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const valueNumber = +value;
    const updatedUser = { ...user };

    switch (name) {
      case "name.first":
        updatedUser.name = { ...updatedUser.name, first: value };
        break;
      case "name.last":
        updatedUser.name = { ...updatedUser.name, last: value };
        break;
      case "location.street.name":
        updatedUser.location = {
          ...updatedUser.location,
          street: { ...updatedUser.location.street, name: value },
        };
        break;
      case "location.street.number":
        updatedUser.location = {
          ...updatedUser.location,
          street: { ...updatedUser.location.street, number: valueNumber },
        };
        break;
      default:
        break;
    }

    setUser(updatedUser);
  };
  const setImageInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file) {
      const url = URL.createObjectURL(file);
      setUser({
        ...user,
        picture: {
          ...user.picture,
          large: url,
        },
      });
    } else {
      setUser({
        ...user,
        picture: {
          ...user.picture,
          large: "",
        },
      });
    }
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  };
  const IsRequiredFilled = (): Boolean => {
    return (
      user.name.first !== "" &&
      user.name.first !== undefined &&
      user.name.last !== "" &&
      user.name.last !== undefined &&
      user.location.street.name !== "" &&
      user.location.street.name !== undefined &&
      user.location.street.number > 0
    );
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openForm.user}
      >
        <UserTitle closeForm={closeForm}>Korisnik</UserTitle>

        <DialogContent id="Dialog description" dividers>
          <Grid>
            <Paper elevation={0}>
              <FormControl onSubmit={onSubmit}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={
                      user.picture.large ? user.picture.large : logo_no_image
                    }
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "20px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />

                  <label
                    htmlFor="file"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Slika:
                    <DriveFolderUploadOutlinedIcon />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={setImageInputValue}
                  />
                </div>
                <TextField
                  label="Ime"
                  placeholder="Milan,Petar,Milica... "
                  name="name.first"
                  value={user.name.first}
                  required={user.name.first.length === 0}
                  autoComplete="off"
                  onKeyDown={handleOnKeyDown}
                  onChange={setUserInputValue}
                  error={
                    user.name.first === undefined || user.name.first === ""
                  }
                />

                <TextField
                  label="Prezime"
                  placeholder="Jovanovic,Mirkovic... "
                  name="name.last"
                  value={user.name.last}
                  required={user.name.last.length === 0}
                  autoComplete="off"
                  onKeyDown={handleOnKeyDown}
                  onChange={setUserInputValue}
                  error={user.name.last === undefined || user.name.last === ""}
                />

                <TextField
                  label="Ulica"
                  placeholder="Obilićev venac, Terazije"
                  name="location.street.name"
                  value={user.location.street.name}
                  required={user.location.street.name.length === 0}
                  autoComplete="off"
                  onKeyDown={handleOnKeyDown}
                  onChange={setUserInputValue}
                  error={
                    user.location.street.name === undefined ||
                    user.location.street.name === ""
                  }
                />

                <TextField
                  label="Broj ulice"
                  placeholder="30, 18a"
                  name="location.street.number"
                  value={user.location.street.number}
                  required={user.location.street.number === 0}
                  autoComplete="off"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  onChange={setUserInputValue}
                  error={
                    user.location.street.number === undefined ||
                    user.location.street.number <= 0
                  }
                />
                <Button
                  sx={{
                    width: "200px",
                    marginTop: "40px",
                  }}
                  type="submit"
                  color="primary"
                  variant="outlined"
                  disabled={!IsRequiredFilled()}
                  onClick={onSubmit}
                >
                  Potvrdi
                </Button>
              </FormControl>
            </Paper>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
