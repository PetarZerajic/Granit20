import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FormControl, IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { IArticle } from "../../../Models/Article";
import logo_no_image from "../../../Assets/no-image-icon.jpg";
import { ArticleService } from "../../../Services/ArticleService";
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

interface ArticleTitleProps {
  children: React.ReactNode;
  closeForm(): void;
}

const ArticleTitle = (props: ArticleTitleProps) => {
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

interface ArticleFormProps {
  openForm: { article: boolean };
  initialArticle: IArticle | null;
  closeForm(): void;
  handleCreateArticleAlert(): void;
}

export default function ArticleForm(props: ArticleFormProps) {
  const { openForm, initialArticle, closeForm, handleCreateArticleAlert } =
    props;

  const [article, setArticle] = useState<IArticle>(
    initialArticle ?? {
      title: "",
      quantity: 0,
      description: "",
      price: 0,
      image: "",
    }
  );
  const [isUnsuccessful, setIsUnSuccessful] = useState<boolean | null>(null);

  const { addNewArticle, updateArticle } = ArticleService();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async () => {
    setLoading(true);
    let isSuccess: boolean | undefined = false;

    if (initialArticle !== null) {
      isSuccess = await updateArticle(article);
    } else {
      isSuccess = await addNewArticle(article);
    }
    if (isSuccess) {
      closeForm();
      handleCreateArticleAlert();
    } else {
      setIsUnSuccessful(true);
      setLoading(false);
      return false;
    }
  };

  const IsRequiredFilled = (): boolean => {
    return (
      article.title !== undefined &&
      article.title !== "" &&
      article.price !== undefined &&
      article.price > 0 &&
      article.quantity !== undefined &&
      article.quantity > 0
    );
  };

  const setArticleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const newValue = name === "quantity" || name === "price" ? +value : value;

    setArticle({
      ...article,
      [name]: newValue,
    });
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  const setImageInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file) {
      const url = URL.createObjectURL(file);
      setArticle({ ...article, image: url });
    } else {
      setArticle({ ...article, image: "" });
    }
  };
  const message = () => {
    let articlAdd = "";
    let articeUpdated = "";

    if (initialArticle !== null) {
      articeUpdated = "ažuriran";
      return articeUpdated;
    } else {
      articlAdd = "dodat";
      return articlAdd;
    }
  };
  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openForm.article}
      >
        <ArticleTitle closeForm={closeForm}>Artikal</ArticleTitle>

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
                    src={article.image ? article.image : logo_no_image}
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "20px",
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
                  label="Naziv"
                  placeholder="Cigla, Drvo, Blok..."
                  name="title"
                  value={article.title}
                  type="string"
                  required={article.title!.length === 0}
                  autoComplete="off"
                  error={article.title === undefined || article.title === ""}
                  onKeyDown={handleOnKeyDown}
                  onChange={setArticleInputValue}
                />
                <TextField
                  label="Količina"
                  name="quantity"
                  value={article.quantity}
                  required={article.quantity === 0}
                  autoComplete="off"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  error={
                    article.quantity === undefined || article.quantity <= 0
                  }
                  onChange={setArticleInputValue}
                />
                <TextField
                  label="Cena"
                  name="price"
                  value={article.price}
                  required={article.price === 0}
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: (
                      <InputAdornment position="end">din</InputAdornment>
                    ),
                  }}
                  autoComplete="off"
                  error={article.price === undefined || article.price <= 0}
                  onChange={setArticleInputValue}
                />
                <TextField
                  label="Opis"
                  multiline
                  maxRows={3}
                  inputProps={{ maxLength: 100 }}
                  name="description"
                  value={article.description}
                  autoComplete="off"
                  onChange={setArticleInputValue}
                />

                <p
                  style={{
                    color: "#b71c1c",
                    fontSize: "18px",
                  }}
                >
                  {isUnsuccessful &&
                    `Problem sa serverom.Artikal neuspešno ${message()}`}
                </p>

                <Button
                  sx={{
                    width: "200px",
                    marginTop: "10px",
                  }}
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
