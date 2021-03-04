import axios from "axios";
import { snackbarNotify } from "../Components/Snackbar";

class FavoriteService {
  addJobToFavorites = (_id: string): Favorite[] | undefined => {
    //get previous favourites and add to it
    let previousFavorites = localStorage.getItem("favorite");
    if (!previousFavorites) {
      this.initFavorites();
    } else {
      let parsedFavorites = (JSON.parse(
        previousFavorites
      ) as unknown) as Favorite[];
      localStorage.setItem(
        "favorite",
        JSON.stringify([...parsedFavorites, _id])
      );
      console.log("Favorite added, new favorites: ", [...parsedFavorites, _id]);
      return [...parsedFavorites, _id] as Favorite[];
    }
  };

  getFavorites = (): Favorite[] => {
    let favorites = localStorage.getItem("favorite");
    if (!favorites) {
      this.initFavorites();
    }
    return JSON.parse(favorites!) as Favorite[];
  };

  removeFavorite = (_id: string): Favorite[] => {
    let favorites = JSON.parse(localStorage.getItem("favorite")!) as Favorite[];

    favorites = favorites.filter((fav) => fav._id !== _id);
    localStorage.setItem("favorite", JSON.stringify(favorites));
    return favorites;
  };

  initFavorites = (): void => {
    let previousFavorites = localStorage.getItem("favorite");
    if (!previousFavorites) {
      localStorage.setItem("favorite", JSON.stringify([]));
    }
  };
}

export default new FavoriteService();
