import { useSelector } from "react-redux";
import { IArticle } from "../../../../Models/Article";
import ArticlesCatalogueContent from "../../../Catalogue/ArticlesCatalogueContent";
import { RootState } from "../../../../Redux/Store/store";
import "./articlesCatalogue.css";
import { Tooltip } from "@mui/material";

interface ArticleProps {
  toggleView: { article: boolean };
  selectArticle(article: IArticle | null): void;
}

export function ArticlesCatalogue({ toggleView, selectArticle }: ArticleProps) {
  const articles = useSelector((state: RootState) => state.articles.articles);

  return (
    <>
      {articles.length > 0 ? (
        <ArticlesCatalogueContent
          toggleView={toggleView}
          selectArticle={selectArticle}
        />
      ) : (
        <h1>
          {articles.length === 0 ? "Ne postoji ni jedan artikal" : undefined}
        </h1>
      )}
      <Tooltip title="Dodaj artikal" placement="top">
        <div className="button-container">
          <button
            className="button-article"
            onClick={() => selectArticle(null)}
          />
        </div>
      </Tooltip>
    </>
  );
}
