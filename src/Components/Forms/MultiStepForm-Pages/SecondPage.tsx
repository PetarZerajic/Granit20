import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormControl, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { InvoiceArticle } from "../../../Models/InvoiceArticle";
import { InvoiceData } from "../InoviceForm/InvoiceData";
import { ChangeEvent } from "react";
import { ICustomer } from "../../../Models/Customers";

const TableInvoice = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "20px" }} align="center">
              Stavke
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }} align="center">
              Količina
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }} align="center">
              Cena
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }} align="left">
              Medjuzbir
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

interface SecondPageProps {
  invoiceArticles: InvoiceArticle[];
  remainingQuantity: number[];
  handleCreateArticle(): void;
  handleRemoveArticle(id: number): void;
  handleSelect(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ): void;
  handleChangeQuantity(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ): void;
  CalculateTotalValue(): number;
}

export default function SecondPage({
  invoiceArticles,
  remainingQuantity,
  handleCreateArticle,
  handleRemoveArticle,
  handleSelect,
  handleChangeQuantity,
  CalculateTotalValue,
}: SecondPageProps) {
  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    width: "1000px",
    height: "400px",
  };
  return (
    <>
      <TableInvoice />
      <Grid>
        <Paper elevation={0} sx={paperStyle}>
          <DialogContent>
            <FormControl>
              <Tooltip title="Napravi racun" placement="top">
                <button
                  className="button-invoice"
                  onClick={handleCreateArticle}
                />
              </Tooltip>

              {invoiceArticles.map((invoiceArticle, index) => (
                <div
                  key={invoiceArticle.id}
                  style={{
                    marginTop: index === 0 ? "20px" : "60px",
                  }}
                >
                  <InvoiceData
                    invoiceArticle={invoiceArticle}
                    handleSelect={handleSelect}
                    handleChangeQuantity={handleChangeQuantity}
                    handleRemoveArticle={handleRemoveArticle}
                    remainingQuantity={remainingQuantity[index]}
                  />
                </div>
              ))}

              <span
                style={{
                  position: "absolute",
                  right: "-400px",
                  bottom: "-60px",
                  maxWidth: "200px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Ukupno:
                {CalculateTotalValue() ? ` ${CalculateTotalValue()} din` : 0}
              </span>
            </FormControl>
          </DialogContent>
        </Paper>
      </Grid>
    </>
  );
}
