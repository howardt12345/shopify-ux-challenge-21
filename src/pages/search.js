import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import styled from 'styled-components';
import axios from 'axios';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

import { media } from '../styles';
import { MovieInfo } from '../components';

const StyledSearchBar = styled.input`
  height: 48px;
  padding: 12px 10px;
  box-sizing: border-box;
  margin: 0 auto;
  width: 600px;
  ${media.tablet`width: 75vw`};
`;

const resultVariant = {
  hidden: {
    opacity: 0,
  },
  visible: i => ({
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      delay: i * 0.125 + 0.5
    }
  })
}

const Search = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      console.log(`fetching results for ${query}...`);
      const result = await axios(
        `https://www.omdbapi.com/?s=${query}&type=movie&page=${page + 1}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      const data = result.data;
      console.log(data);
      if (data.Response === 'True') {
        console.log("response received");
        setResults(data.Search);
      } else {
        console.log(`response failed: ${error}`);
        setResults([]);
        setError(data.Error);
      }
    }

    fetchData();
  }, [query, page]);

  const debounced = useDebouncedCallback((value) => {
    setQuery(value);
  }, 1000);

  return (
    <div>
      <StyledSearchBar
        type="text"
        placeholder={"Search"}
        onChange={(e) => debounced.callback(e.target.value)}
      />
      {results.length !== 0 && (
        results.map((result, i) => {
          return (
            <motion.div
              key={'search_result_' + result.imdbID}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={resultVariant}
            >
              <MovieInfo
                title={result.Title}
                year={result.Year}
                id={result.imdbID}
                key={"search_" + result.imdbID}
                poster={result.Poster}
              />
            </motion.div>
          )
        })
      )}
    </div>
  );
}

export default Search;