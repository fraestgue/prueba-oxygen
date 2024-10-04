import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../utils/api";

function Card() {
  const [conver, setConver] = useState(null);
  const [inputCuantity, setInputCuantity] = useState(0);
  const [selectedConver, setSelectedConver] = useState(null);
  const [result, setResult] = useState(0);

  const handleConver = (e) => {
    const selected = conver.find(
      (eachConver) => eachConver.name === e.target.value
    );
    setSelectedConver(selected);
  };

  const handleInputCuantity = (e) => {
    setInputCuantity(e.target.value);
  };

  useEffect(() => {
    getConversionData();
  }, []);

  const getConversionData = async () => {
    try {
      const response = await axios.get(`${API_URL}/convertions`);
      setConver(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedConver && inputCuantity > 0) {
      const calculatedResult = selectedConver.equivalence * inputCuantity;
      setResult(parseFloat(calculatedResult.toFixed(2)));
    } else {
      setResult(0);
    }
  }, [selectedConver, inputCuantity]);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000); 
  };

  

  const handleSubmitFav = async (event) => {
    event.preventDefault();

    if (!selectedConver) {
      console.log("No conversion selected");
      return;
    }

    const newFav = {
      originalUnit: selectedConver.originalUnit,
      originalNumber: inputCuantity,
      resultUnit: selectedConver.resultUnit,
      result: selectedConver.equivalence * inputCuantity,
      id: generateRandomId()
    };

    try {
      axios.post(`${API_URL}/favresults`, newFav);
      setConver((prevFavs) => [...prevFavs, newFav])
      setResult(newFav.result);
    } catch (error) {
      console.log(error);
    }
  };

  if (conver === null) {
    return <h3>cargando...</h3>;
  }


  

  return (
    <div>
      <form onSubmit={handleSubmitFav}>
        <select onChange={handleConver}>
          <option value=""> -- SELECCIONA LA CONVERSIÓN --</option>
          {conver.map((eachConver) => {
            return <option key={eachConver.id}>{eachConver.name}</option>;
          })}
        </select>

        <input
          name="cuantity"
          type="number"
          onChange={handleInputCuantity}
          value={inputCuantity} 
        ></input>
        {selectedConver && <span>{selectedConver.originalUnit}</span>}
         

        <button type="submit">Fav</button>
      </form>
      <div>{result > 0 ? ( <h3>{result.toFixed(2)} {selectedConver.resultUnit} </h3>) : 0} </div>
     
    </div>
  );
}

export default Card;
