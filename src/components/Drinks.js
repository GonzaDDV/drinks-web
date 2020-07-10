import React, { useEffect, useState } from "react";
import axios from "axios";

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [leerMas, setLeerMas] = useState(false);
  const [tragoExtendido, setTragoExtendido] = useState({});

  useEffect(() => {
    async function getData() {
      const data = await axios.get(process.env.REACT_APP_API_URL + "/drinks");
      setDrinks(data.data);
    }
    getData();
  }, []);

  function extenderTrago(id) {
    drinks.forEach((trago) => {
      if (trago._id === id) {
        setLeerMas(true);
        setTragoExtendido(trago);
      }
    });
  }

  function minimizarTrago() {
    setLeerMas(false);
    setTragoExtendido({});
  }

  return (
    <main>
      {leerMas && (
        <div className="container-trago-extended">
          <div className="trago-extended">
            <img src={tragoExtendido.url} alt={tragoExtendido.title} />
            <h3>{tragoExtendido.title}</h3>
            <h6>Autor: {tragoExtendido.author}</h6>
            <p>{tragoExtendido.description}</p>
            <div className="gg-close" onClick={minimizarTrago}></div>
          </div>
        </div>
      )}
      <h1>Todos los tragos</h1>
      <div className="grid-tragos">
        {drinks.map((item) => (
          <div
            key={item._id}
            className="trago"
            onClick={() => extenderTrago(item._id)}
          >
            <img src={item.url} alt={item.title} />
            <h3>{item.title}</h3>
            <h6>Autor: {item.author}</h6>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Drinks;
