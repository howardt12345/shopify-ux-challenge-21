import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import styled from 'styled-components';
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { ChevronLeft, ChevronRight } from '@styled-icons/boxicons-regular';

import { media } from '../styles';
import { MovieInfo } from '../components';

const StyledSearchBar = styled.input`
  padding: 1em 1em;
  box-sizing: border-box;
  width: 600px;
  ${media.tablet`width: 80vw`};
`;
const StyledSearchNav = styled(motion.div)`
  display: flex;
  justify-content: center;
`;
const StyledButton = styled(motion.a)`
  svg {
    width: 24px;
    height: 24px;
  }
`;
const StyledText = styled(motion.h5)`
  font-weight: 400;
  text-align: center;
`;

const navVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    }
  }
}
const errorVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      delay: 0.25,
    }
  }
}
const resultVariant = {
  hidden: {
    opacity: 0,
  },
  visible: i => ({
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      delay: i * 0.125 + 0.125
    }
  })
}

const Search = ({ initialQuery = '', nominate, isNominated }) => {
  const [query, setQuery] = useState(initialQuery);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      console.log(`fetching results for ${query}...`);
      const result = await axios(
        `https://www.omdbapi.com/?s=${query}&type=movie&page=${page + 1}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      const data = result.data;
      console.log(data);
      if (data.Response === 'True') {
        const totalResults = parseInt(data.totalResults);
        console.log(`${totalResults} responses received`);

        setResults(data.Search);
        setTotalPages(Math.ceil(totalResults / 10));
        setTotalResults(totalResults);
        setError('');
      } else {
        console.log(`response failed: ${data.Error}`);

        setResults([]);
        setTotalPages(1);
        setTotalResults(0);
        setError(data.Error);
      }
    }

    fetchData();
  }, [query, page]);

  const debounced = useDebouncedCallback((value) => {
    setStarted(true);
    setPage(0);
    setQuery(value);
  }, 1000);

  const nextPage = () => {
    if (page + 1 < totalPages) {
      setPage(page + 1);
    }
  }

  const prevPage = () => {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  }

  return (
    <div>
      <StyledSearchBar
        type="text"
        placeholder={"Search Movies"}
        onChange={(e) => debounced.callback(e.target.value)}
      />
      {results.length === 0 && started && query.length !== 0 && (
        <StyledText
          key="search_nav_page_indicators"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={errorVariant}
          style={{ lineHeight: '0' }}
          layout
        >
          {`Search failed: ${error}`}
        </StyledText>
      )}
      <StyledSearchNav
        key="search_nav"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={navVariant}
      >
        <div style={{
          width: '24px',
          height: '24px',
          padding: '12px',
        }}>
          {!(page === 0) && (
            <StyledButton
              onClick={prevPage}
              key="search_nav_prev"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariant}
              layout
            >
              <ChevronLeft />
            </StyledButton>
          )}
        </div>
        <div style={{
          height: '24px',
        }}>
          {results.length !== 0 && (
            <StyledText
              key="search_nav_page_indicators"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariant}
              style={{ lineHeight: '0' }}
              layout
            >
              {`Page ${page + 1} of ${totalPages} (${totalResults} results)`}
            </StyledText>
          )}
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          padding: '12px',
        }}>
          {!(page === (totalPages - 1)) && (
            <StyledButton
              onClick={nextPage}
              key="search_nav_next"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariant}
              layout
            >
              <ChevronRight />
            </StyledButton>
          )}
        </div>
      </StyledSearchNav>
      <AnimatePresence>
        {results.length !== 0 && (
          results.map((result, i) => {
            return (
              <motion.div
                key={'search_result_' + result.imdbID}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={resultVariant}
              >
                <MovieInfo
                  search={true}
                  movie={result}
                  key={"search_" + result.imdbID}
                  nominate={nominate}
                  isNominated={isNominated(result.imdbID)}
                />
              </motion.div>
            )
          })
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search;