import {
  Button,
  FormControl,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { InvoiceArticle } from "../../../Models/InvoiceArticle";
import { RootState } from "../../../Redux/Store/store";
import { ChangeEvent } from "react";
import "./invoiceData.css";
export interface Props {
  invoiceArticle: InvoiceArticle;
  remainingQuantity: number;
  handleSelect(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ): void;
  handleChangeQuantity(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ): void;
  handleRemoveArticle(id: number): void;
}

export const InvoiceData = ({
  invoiceArticle,
  remainingQuantity,
  handleSelect,
  handleChangeQuantity,
  handleRemoveArticle,
}: Props) => {
  const articles = useSelector((state: RootState) => state.articles.articles);
  const price: number = invoiceArticle.price!;
  const quantity: number = invoiceArticle.orderedQuantity!;
  const subtotal = price * quantity;

  return (
    <FormControl>
      <div className="container">
        <TextField
          className="articles"
          label="Stavke"
          select
          value={invoiceArticle.articleId}
          defaultValue=""
          error={
            invoiceArticle.articleId === undefined ||
            invoiceArticle.articleId <= 0
          }
          onChange={(event) => handleSelect(event, invoiceArticle.id!)}
        >
          {articles.map((article) => (
            <MenuItem key={article.id} value={article.id}>
              <ListItemText primary={article.title} />
            </MenuItem>
          ))}
        </TextField>

        <span className="error-quantity-message">
          {remainingQuantity < invoiceArticle.orderedQuantity! &&
            `Maksimalna kolicina je ${remainingQuantity}`}
        </span>

        <TextField
          className="quantity"
          label="Količina"
          placeholder="Unesite kolicinu "
          name="orderedQuantity"
          value={invoiceArticle.orderedQuantity}
          required={invoiceArticle.orderedQuantity === 0}
          type="number"
          autoComplete="off"
          InputProps={{
            inputProps: {
              min: 0,
              max: remainingQuantity,
            },
          }}
          fullWidth
          error={
            invoiceArticle.orderedQuantity === undefined ||
            invoiceArticle.orderedQuantity <= 0 ||
            remainingQuantity < invoiceArticle.orderedQuantity
          }
          onChange={(event) => handleChangeQuantity(event, invoiceArticle.id!)}
        />

        <span className="price">
          {invoiceArticle.price ? `${invoiceArticle.price} din` : 0}
        </span>

        <span className="subtotal">{subtotal ? `${subtotal} din` : 0}</span>

        <Button
          className="delete-button"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleRemoveArticle(invoiceArticle.id!)}
        >
          Izbriši
        </Button>
      </div>
    </FormControl>
  );
};
