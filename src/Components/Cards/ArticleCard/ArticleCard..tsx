import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IArticle } from "../../../Models/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import logo_no_image from "../../../Assets/no-image-icon.jpg";
import { ArticleService } from "../../../Services/ArticleService";
import "../Common/common.css";

export interface ArticleCardProps {
  toggleView: { article: boolean };
  article: IArticle;
  selectArticle(article: IArticle | null): void;
}

export default function ArticleCard(props: ArticleCardProps) {
  const { toggleView, article, selectArticle } = props;

  const { deleteArticle } = ArticleService();
  const handleDeleteArticle = () => {
    deleteArticle(article);
  };

  return (
    <Card className={`Card ${toggleView.article ? "List" : "Grid"}`}>
      <CardMedia
        className={`media ${toggleView.article ? "media-list" : "media-grid"}`}
        image={article.image || logo_no_image}
      />
      <CardContent
        className={`content ${
          toggleView.article ? "content-list" : "content-grid"
        }`}
      >
        <Typography gutterBottom variant="h5">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Količina: {article.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.price} din
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Opis: {article.description}
        </Typography>
      </CardContent>

      <CardActions
        className={`actions ${
          toggleView.article ? "list-actions" : "grid-actions"
        }`}
      >
        <Button
          className={`action-button ${
            toggleView.article ? "button-list" : "button-grid"
          }`}
          size="small"
          variant="outlined"
          onClick={() => selectArticle(article)}
        >
          Ažuriraj
        </Button>

        <Button
          className={`action-button ${
            toggleView.article ? "button-list" : "button-grid"
          }`}
          color="error"
          size="small"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteArticle}
        >
          Izbriši
        </Button>
      </CardActions>
    </Card>
  );
}
