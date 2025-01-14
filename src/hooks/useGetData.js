import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function useGetData(url) {
  const [dataMovies, setDataMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (url) => {
      const api = axios.create({
        baseURL: "https://api.themoviedb.org/3/",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      });
      const { data } = await api.get(url, {
        params: {
          page: page,
        },
      });

      if (data.results) {
        if (id === categoryId && page > 1) {
          setDataMovies([...dataMovies, ...data.results]);
        } else {
          setDataMovies(data.results);
          setPage(1);
        }
      } else {
        setDataMovies(data);
      }
      setCategoryId(id);
      setLoading(false);
    };

    if (typeof url !== "undefined" && url !== null) {
      fetchData(url);
    }
  }, [page, id]);
  return { page, setPage, dataMovies, loading };
}
