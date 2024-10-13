import { useEffect, useState } from "react";
import Card from "./Card";
import FavCard from "./FavCard";
import API_URL from "../utils/api";
import axios from "axios";

function MainComponent() {
  const [allFav, setAllFav] = useState([]);

  useEffect(() => {
    getFavConvertions();
  }, []);

  const getFavConvertions = async () => {
    try {
      const response = await axios.get(`${API_URL}/favresults`);
      setAllFav(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFavs = (newFav) => {
    setAllFav((prevFavs) => {
      return Array.isArray(newFav)
        ? [...newFav, ...prevFavs ]
        : [newFav, ...prevFavs ];
    });
  };

const deleteFavFromState = (id) => {
    setAllFav((prevFavs) => prevFavs.filter(fav => fav.id !== id));
  };

  return (
    <div className="page">
      <Card updateFavs={updateFavs}  />

      <FavCard allFav={allFav} deleteFavFromState={deleteFavFromState} />
    </div>
  );
}

export default MainComponent;
