import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
};

const UpdateMovie = ({ getMovieList }) => {
  const [update, setUpdate] = useState(initialMovie);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, update)
      .then((res) => {
        console.log("PUT request for updating movie", res);
        getMovieList();
        history.push(`/`);
      })
      .catch((err) => console.log(err));

    setUpdate(initialMovie);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="title"
            value={update.title}
            placeholder="Title"
            onChange={handleInput}
          />
        </label>

        <label>
          <input
            type="text"
            name="director"
            value={update.director}
            placeholder="Director"
            onChange={handleInput}
          />
        </label>

        <label>
          <input
            type="number"
            name="metascore"
            value={update.metascore}
            placeholder="Metascore"
            onChange={handleInput}
          />
        </label>

        <button onSubmit={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
