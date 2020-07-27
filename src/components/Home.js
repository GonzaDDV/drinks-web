import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const Home = () => {
  const cookies = new Cookies();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (cookies.get("accepted")) {
      setAccepted(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    const timeToExpire = new Date(2030, 12);

    cookies.set("accepted", true, { expires: timeToExpire });
    setAccepted(true);
  };

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
      {!accepted && (
        <div className="container-mayor-edad">
          <h1>Para entrar a la plataforma, tienes que ser mayor de 18 años.</h1>
          <button onClick={() => handleAcceptCookies()}>
            Soy mayor de 18 años!
          </button>
        </div>
      )}
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
