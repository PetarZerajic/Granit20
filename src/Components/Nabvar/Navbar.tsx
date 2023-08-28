import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import logo_granit from "../../Assets/granit.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  UserCataloguePath,
  ArticlesCataloguePath,
  CustomerCataloguePath,
  InvoiceCataloguePath,
} from "../Routes/Common/Common";

export const Navbar = () => {
  return (
    <>
      <Box>
        <AppBar component="nav">
          <Toolbar>
            <img
              id="image"
              width="80px"
              height="60px"
              src={logo_granit}
              alt=""
            />

            <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
              <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
                Granit
              </Link>
            </Typography>

            <Box sx={{ display: "flex", gap: "20px" }}>
              <Link to={UserCataloguePath}>
                <Button
                  sx={{
                    color: "white",
                  }}
                >
                  Korisnici
                </Button>
              </Link>
              <Link to={ArticlesCataloguePath}>
                <Button
                  sx={{
                    color: "white",
                  }}
                >
                  Artikli
                </Button>
              </Link>

              <Link to={CustomerCataloguePath}>
                <Button
                  sx={{
                    color: "white",
                  }}
                >
                  Kupci
                </Button>
              </Link>
              <Link to={InvoiceCataloguePath}>
                <Button
                  sx={{
                    color: "white",
                  }}
                >
                  Računi
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
