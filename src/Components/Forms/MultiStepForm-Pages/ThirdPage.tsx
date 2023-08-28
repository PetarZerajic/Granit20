import { InvoiceArticle } from "../../../Models/InvoiceArticle";
import { ICustomer } from "../../../Models/Customers";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/store";

interface ThirdPageProps {
  customer: ICustomer;
  invoiceArticles: InvoiceArticle[];
  totalPriceBill: number;
}

export default function ThirdPage({
  customer,
  totalPriceBill,
  invoiceArticles,
}: ThirdPageProps) {
  const articlesFromRedux = useSelector(
    (state: RootState) => state.articles.articles
  );

  const articles = invoiceArticles.map((article, index) => {
    const articleTitle = articlesFromRedux.find(
      (art) => art.id === article.articleId
    )?.title;
    return <p key={index}>{articleTitle}</p>;
  });
  const customersInRedux = useSelector(
    (state: RootState) => state.customers.customers
  );

  const name = customersInRedux.find((cust) => cust.id === customer.id)?.name;
  const lastName = customersInRedux.find(
    (cust) => cust.id === customer.id
  )?.lastName;

  const quantity = invoiceArticles.map((article, index) => (
    <p key={index}>{article.orderedQuantity}</p>
  ));
  const price = invoiceArticles.map((article, index) => (
    <p key={index}>{article.price} din</p>
  ));
  return (
    <div
      style={{
        width: "1000px",
        height: "455px",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px" }}>Kupac</TableCell>
              <TableCell sx={{ fontSize: "20px" }} align="center">
                Artikli
              </TableCell>
              <TableCell sx={{ fontSize: "20px" }} align="center">
                Količina
              </TableCell>
              <TableCell sx={{ fontSize: "20px" }} align="center">
                Cena
              </TableCell>
              <TableCell sx={{ fontSize: "20px" }} align="center">
                Ukupno
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontSize: "18px" }}>
                {name} {lastName}
              </TableCell>
              <TableCell sx={{ fontSize: "18px" }} align="center">
                {articles}
              </TableCell>

              <TableCell sx={{ fontSize: "18px" }} align="center">
                {quantity}
              </TableCell>
              <TableCell sx={{ fontSize: "18px" }} align="center">
                {price}
              </TableCell>
              <TableCell sx={{ fontSize: "18px" }} align="center">
                {totalPriceBill} din
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
