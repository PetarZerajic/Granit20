import ArticleCard from "../Cards/ArticleCard/ArticleCard.";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/store";
import { IArticle } from "../../Models/Article";

interface ArticlesCatalogueProps {
  toggleView: { article: boolean };
  selectArticle(article: IArticle | null): void;
}
export default function ArticlesCatalogueContent({
  toggleView,
  selectArticle,
}: ArticlesCatalogueProps) {
  const articles = useSelector((state: RootState) => state.articles.articles);

  return (
    <Box padding={6}>
      <Grid container spacing={6}>
        {articles.map((article) => {
          return (
            <Grid key={article.id} item>
              <ArticleCard
                article={article}
                selectArticle={selectArticle}
                toggleView={toggleView}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
