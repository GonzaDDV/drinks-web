import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddDrinks = () => {
  const handleImageUpload = () => {
    const { files } = document.getElementById("file");
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const correctType = acceptedImageTypes.includes(files[0].type);

    const subirImagen = () => {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "zazdw5eu");
      const options = {
        method: "POST",
        body: formData,
      };
      return fetch(process.env.REACT_APP_CLOUDINARY_URL, options)
        .then((res) => res.json())
        .then((res) => setUrl(res.secure_url))
        .then(() => setCanSubmit(true))
        .catch((err) => console.log(err));
    };
    const archivoIncorrecto = () => {
      Swal.fire({
        titleText: "Hubo un error",
        text: "El archivo que subiste no es válido, por favor subí una imagen",
        icon: "error",
        confirmButtonText: "Perfecto",
      });
    };
    correctType ? subirImagen() : archivoIncorrecto();
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    if (!canSubmit) {
      alert("Por favor espera, estamos subiendo el archivo");
      return;
    }
    const drink = {
      title,
      author,
      description,
      url,
    };

    const uploadSuccess = () => {
      Swal.fire({
        titleText: "Trago subido!",
        text: "A disfrutar! Gracias por tu aporte",
        icon: "success",
        confirmButtonText: "Listo",
      });
    };

    await axios
      .post(process.env.REACT_APP_API_URL + "/drinks", drink)
      .then(uploadSuccess());
  }

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function onChangeAuthor(e) {
    setAuthor(e.target.value);
  }

  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <main>
      <h1>Agregar trago</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Título</label>
        <input type="text" name="title" onChange={onChangeTitle} required />
        <label htmlFor="author">Autor</label>
        <input type="text" name="author" onChange={onChangeAuthor} required />
        <input
          type="file"
          name="file"
          id="file"
          className="inputfile"
          onChange={handleImageUpload}
          required
        />
        <label htmlFor="file">
          <span className="gg-software-upload"></span> Subir una imagen
        </label>
        {url && <label>Vista previa:</label>}
        <img src={url} alt={url && title} />
        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          onChange={onChangeDescription}
          required
        ></textarea>
        <button type="submit">Agregar</button>
      </form>
    </main>
  );
};

export default AddDrinks;
