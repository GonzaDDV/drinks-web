import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [rndDrink, setRndDrink] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const data = await axios.get(
        process.env.REACT_APP_API_URL + "/drinks/random"
      );
      setRndDrink(data.data[0]);
    }
    getData();
  }, []);

  return (
    <main className="home">
      <h1>Trago aleatorio</h1>
      <div className="trago-home">
        <div id="skeleton" className={!loading ? "finished" : null}></div>
        <img
          src={rndDrink.url}
          alt={rndDrink.title}
          className="img-drink"
          onLoad={() => setLoading(false)}
        />
        {!loading && (
          <>
            <h3 className="title-drink">{rndDrink.title}</h3>
            <p className="author-drink">Subido por {rndDrink.author}</p>
          </>
        )}
      </div>

      <Link className="btn-tragos" to="/tragos">
        Ver más tragos
      </Link>
    </main>
  );
};

export default Home;
