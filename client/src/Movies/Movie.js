import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const params = useParams();

  const fetchMovie = () => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (e) => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log("DELETE request for movie", res);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);
  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${params.id}`}>
        <button>Update</button>
      </Link>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}
export default Movie;
