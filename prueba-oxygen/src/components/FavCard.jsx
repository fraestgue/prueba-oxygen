import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";


function FavCard() {
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

  const deleteFav = async (id) => {
    try {
        await axios.delete(`${API_URL}/favresults/${id}`);
        setAllFav(allFav.filter(fav => fav.id !== id)); 
    } catch (error) {
        console.error(error);
    }
};

  if (allFav === null) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div>
      {allFav.map((eachFav) => {
        return (
            <div key={eachFav.id}>
            {eachFav === null ? <h3>Aun no tienes conversiones favoritas</h3> : <h5>
            {eachFav.originalNumber} {eachFav.originalUnit} →{" "}
            {eachFav.result.toFixed(2)} {eachFav.resultUnit}
          </h5> }

          <button onClick={() => deleteFav(eachFav.id)}>Eliminar</button>
          
        </div>
        )
        
      })}
    </div>
  );
}

export default FavCard;
