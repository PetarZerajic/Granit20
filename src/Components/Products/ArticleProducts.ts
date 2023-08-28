import { IArticle } from "../../Models/Article";
import logo_Bricks from "../../Assets/brick.webp";
import logo_Hammer from "../../Assets/Hammer.png";
import logo_Ceramic from "../../Assets/Ceramic-tiles.jpg";
import logo_Cement from "../../Assets/White cement.png";
import logo_Steal from "../../Assets/mild-steal.jpg";

export const articles: IArticle[] = [
  {
    id: 1,
    image: logo_Hammer,
    title: "Čekić",
    description: "Na stanju",
    quantity: 5,
    price: 20,
  },

  {
    id: 2,
    image: logo_Bricks,
    title: "Cigla",
    description: "Na stanju",
    quantity: 10,
    price: 22,
  },
  {
    id: 3,
    image: logo_Ceramic,
    title: "Keramičke pločice",
    description: "Na stanju",
    quantity: 20,
    price: 32,
  },
  {
    id: 4,
    image: logo_Cement,
    title: "Beli Cement",
    description: "Na stanju",
    quantity: 13,
    price: 30,
  },
  {
    id: 5,
    image: logo_Steal,
    title: "Meki čelik",
    description: "Na stanju",
    quantity: 7,
    price: 40,
  },
];
