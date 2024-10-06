

function InvertirValores({ conver, selectedConver, setSelectedConver, inputCuantity, setInputCuantity, result, setResult }) {

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

    setInputCuantity(result)
    setResult(inputCuantity)
  };

  return <div>
    <button onClick={handleInvertirValores}>⇄</button>
  </div>;
}

export default InvertirValores;
