// import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";


function FavCard({allFav, deleteFavFromState}) {


  const deleteFav = async (id) => {
    try {
        await axios.delete(`${API_URL}/favresults/${id}`);
        deleteFavFromState(id); 
    } catch (error) {
        console.error(error);
    }
};

  if (allFav.length === 0) {
    return <h3>Aún no tienes favoritos</h3>;
  }

  return (
    <div>
      <h3>saved</h3>
      {allFav.map((eachFav) => {
        return (
            <div key={eachFav.id} className="saved">
            {eachFav.length === 0 ? <h3>Aun no tienes conversiones favoritas</h3> : ( <h5 className="fav">
            {eachFav.originalNumber} {eachFav.originalUnit} →{" "}
            {eachFav.result.toFixed(2)} {eachFav.resultUnit}
          </h5> )}

          {/* {console.log(eachFav.result.toFixed(2))} */}

          <button onClick={() => deleteFav(eachFav.id)}>╳</button>
          
        </div>
        )
        
      })}
    </div>
  );
}

export default FavCard;
