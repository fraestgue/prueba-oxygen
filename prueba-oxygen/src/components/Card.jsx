import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../utils/api";

function Card({ updateFavs }) {
  const [conver, setConver] = useState(null);
  const [inputCuantity, setInputCuantity] = useState("");
  const [selectedConver, setSelectedConver] = useState(null);
  const [result, setResult] = useState("");

  const handleConver = (e) => {
    const selected = conver.find(
      (eachConver) => eachConver.name === e.target.value
    );
    setSelectedConver(selected);
  };

  const handleInputCuantity = (e) => {
    const valorNumerico = parseFloat(e.target.value);
    if (valorNumerico > 0) {
      setInputCuantity(valorNumerico);
    }
  };

  useEffect(() => {
    getConversionData();
  }, []);

  const getConversionData = async () => {
    try {
      const response = await axios.get(`${API_URL}/convertions`);
      setConver(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(conver)

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
      result: parseFloat((selectedConver.equivalence * inputCuantity).toFixed(2)),
      id: generateRandomId(),
    };

    try {
      await axios.post(`${API_URL}/favresults`, newFav);
      updateFavs( newFav);
      // console.log(conver)
      // setResult(newFav.result);
      // console.log(result)
    } catch (error) {
      console.log(error);
    }

    setInputCuantity("");
  };

  const handleInvertirValores = () => {
    if (selectedConver === conver[0]) {
      setSelectedConver(conver[1]);
    } else if (selectedConver === conver[1]) {
      setSelectedConver(conver[0]);
    } else if (selectedConver === conver[2]) {
      setSelectedConver(conver[3]);
    } else if (selectedConver === conver[3]) {
      setSelectedConver(conver[2]);
    } else if (selectedConver === conver[4]) {
      setSelectedConver(conver[5]);
    } else if (selectedConver === conver[5]) {
      setSelectedConver(conver[4]);
    }

    const tempInput = inputCuantity;

    setInputCuantity(result);
    setResult(tempInput);
  };

  if (conver === null) {
    return <h3>cargando...</h3>;
  }

  return (
    <div className="card">
      <h1>convert</h1>
      <form onSubmit={handleSubmitFav} className="form">
        <div className="first">
          <select
            onChange={handleConver}
            type="select"
            className="selectConver"
          >
            <option value=""> -- SELECCIONA LA CONVERSIÓN --</option>
            {conver.map((eachConver) => {
              return <option key={eachConver.id}>{eachConver.name}</option>;
            })}
          </select>

          <button type="button" onClick={handleInvertirValores}>
            ⇄
          </button>
        </div>

        <div className="first">
          <input
            className="inputNumber"
            name="cuantity"
            type="number"
            onChange={handleInputCuantity}
            value={inputCuantity}
          ></input>
          {selectedConver && <span>{selectedConver.originalUnit}</span>}
        </div>

        <div className="first">
          <button type="submit">♡</button>
          <div>
            {result > 0 ? (
              <h3>
                {result} {selectedConver.resultUnit}{" "}
              </h3>
            ) : (
              0
            )}{" "}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Card;
