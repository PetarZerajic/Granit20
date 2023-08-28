import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUserInfo } from "../../../Models/User";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../Redux/Reducers/UsersSlice";
import logo_no_image from "../../../Assets/no-image-icon.jpg";
export interface UserCardProps {
  toggleView: { user: boolean };
  user: IUserInfo;
  selectUser(user: IUserInfo | null): void;
}

export default function UserCard({
  toggleView,
  user,
  selectUser,
}: UserCardProps) {
  const dispatch = useDispatch();
  const handleDeleteUser = () => {
    dispatch(deleteUser(user));
  };

  return (
    <Card className={`Card ${toggleView.user ? "List" : "Grid"}`}>
      <CardMedia
        className={`media ${toggleView.user ? "media-list" : "media-grid"}`}
        image={user.picture.large || logo_no_image}
      />
      <CardContent
        className={`content ${
          toggleView.user ? "content-list" : "content-grid"
        }`}
      >
        <Typography gutterBottom variant="h6" component="h2">
          {user.name.first} {user.name.last}
        </Typography>
        <Typography
          sx={{ maxWidth: "200px", maxHeight: "20px" }}
          variant="body2"
          color="text.secondary"
        >
          {user.location.street.name} ,{user.location.street.number}
        </Typography>
      </CardContent>

      <CardActions
        className={`actions ${
          toggleView.user ? "list-actions" : "grid-actions"
        }`}
      >
        <Button
          className={`action-button ${
            toggleView.user ? "button-list" : "button-grid"
          }`}
          size="small"
          variant="outlined"
          onClick={() => selectUser(user)}
        >
          Ažuriraj
        </Button>
        <Button
          className={`action-button ${
            toggleView.user ? "button-list" : "button-grid"
          }`}
          size="small"
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteUser}
        >
          Izbriši
        </Button>
      </CardActions>
    </Card>
  );
}
