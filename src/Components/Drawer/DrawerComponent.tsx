import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { IInvoice } from "../../Models/Invoice";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/store";
import { useState } from "react";
import "./drawerComponent.css";

interface DrawerProps {
  isOpen: boolean;
  invoice: IInvoice;
  closeDrawer(): void;
}
enum ItemsKey {
  price = "price",
  quantity = "quantity",
}
type ItemsState = {
  [key in ItemsKey]: boolean;
};

export default function DrawerComponent(props: DrawerProps) {
  const { isOpen, invoice, closeDrawer } = props;

  const [openItems, setOpenItems] = useState<ItemsState>({
    price: true,
    quantity: true,
  });

  const handleToggleItems = (key: ItemsKey) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [key]: !prevOpenItems[key],
    }));
  };

  const articlesInRedux = useSelector(
    (state: RootState) => state.articles.articles
  );
  const articles = invoice.articles!.map((article) => {
    const articleTitle = articlesInRedux.find(
      (art) => art.id === article.articleId
    )?.title;
    return articleTitle;
  });
  const prices = invoice.articles!.map((article) => {
    const articlePrice = articlesInRedux.find(
      (art) => art.id === article.articleId
    )?.price;
    return articlePrice;
  });
  const quantities = invoice.articles!.map((art) => art.orderedQuantity);
  return (
    <>
      <Drawer
        anchor="right"
        open={isOpen}
        hideBackdrop
        ModalProps={{ style: { pointerEvents: "none" } }}
      >
        <Box
          p={2}
          width="250px"
          textAlign="center"
          sx={{ pointerEvents: "auto" }}
        >
          <Typography variant="h5">Račun</Typography>
          {closeDrawer ? (
            <IconButton
              aria-label="close"
              onClick={closeDrawer}
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

          <List>
            <ListItemButton className="list-item-button">
              <Grid container>
                <ListItemIcon className="list-item-icon">
                  <LocalOfferIcon />
                  <ListItemText
                    className="list-item-text"
                    primary="Cena"
                    onClick={() => handleToggleItems(ItemsKey.price)}
                  />
                </ListItemIcon>
                <ListItem>
                  {openItems.price && (
                    <List>
                      {articles.map((article, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            className="item-text"
                            primary={article}
                            secondary={`${prices[index]} din`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </ListItem>
              </Grid>
            </ListItemButton>

            <ListItemButton>
              <Grid container>
                <ListItemIcon className="list-item-icon">
                  <LocalGroceryStoreIcon />
                  <ListItemText
                    className="list-item-text"
                    primary="Količina"
                    onClick={() => handleToggleItems(ItemsKey.quantity)}
                  />
                </ListItemIcon>
                <ListItem>
                  {openItems.quantity && (
                    <List>
                      {articles.map((article, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            className="item-text"
                            primary={article}
                            secondary={`${quantities[index]} kom`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </ListItem>
              </Grid>
            </ListItemButton>

            <ListItemButton sx={{ cursor: "default" }}>
              <Grid container>
                <ListItemIcon className="list-item-icon">
                  <CreditCardIcon />
                  <ListItemText
                    className="list-item-text"
                    primary={`Ukupno  ${invoice.totalPriceBill}`}
                    secondary="din"
                  />
                </ListItemIcon>
              </Grid>
            </ListItemButton>

            <ListItemButton sx={{ cursor: "default" }}>
              <Grid container>
                <ListItemIcon className="list-item-icon">
                  <DateRangeIcon />
                  <ListItemText primary={invoice.dateExecution} />
                </ListItemIcon>
              </Grid>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
