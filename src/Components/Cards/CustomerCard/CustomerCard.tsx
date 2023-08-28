import { ICustomer } from "../../../Models/Customers";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import img from "../../../Assets/Client.png";
import { CustomerService } from "../../../Services/CustomerService";
import { useNavigate } from "react-router-dom";
import { CustomerProfilePath } from "../../Routes/Common/Common";

interface CustomerCardProps {
  toggleView: { customer: boolean };
  customer: ICustomer;
  selectCustomer(customer: ICustomer | null): void;
}

export const CustomerCard = ({
  toggleView,
  customer,
  selectCustomer,
}: CustomerCardProps) => {
  const { deleteCustomer } = CustomerService();
  const handleDeleteCustomer = () => {
    deleteCustomer(customer);
  };
  const navigate = useNavigate();
  const handleNavigateToProfile = () => {
    navigate(`${CustomerProfilePath}/${customer.id}`, {
      state: { fromCard: true },
    });
  };
  return (
    <Card className={`Card ${toggleView.customer ? "List" : "Grid"}`}>
      <CardActionArea
        sx={{ cursor: "pointer" }}
        onClick={handleNavigateToProfile}
      >
        <CardMedia className="media" image={img} />
      </CardActionArea>

      <CardContent className="content">
        <Typography gutterBottom variant="h5" component="h2">
          {customer.name} {customer.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {customer.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Broj lične karte: {customer.presonalNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          JMBG: {customer.uniqueCitizens}
        </Typography>
      </CardContent>
      <CardActions className="actions">
        <Button
          className="action-button"
          size="small"
          variant="outlined"
          onClick={() => selectCustomer(customer)}
        >
          Ažuriraj
        </Button>

        <Button
          className="action-button"
          color="error"
          size="small"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteCustomer}
        >
          Izbriši
        </Button>
      </CardActions>
    </Card>
  );
};
