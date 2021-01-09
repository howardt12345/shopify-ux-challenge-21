import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'react-simple-snackbar'
import axios from 'axios';
import { Brightness3, Brightness7 } from '@styled-icons/material';
import { InfoCircle } from '@styled-icons/boxicons-regular';

import Search from './search';
import Nominations from './nominations';

import { media, lightTheme, darkTheme, GlobalStyles } from '../styles';
import { Button, InfoDialog } from '../components';

const queryString = require('query-string');

const StyledInfoBox = styled.div`
  margin-left: auto;
  display: flex; 
  justify-content: flex-end;
`;
const StyledRoot = styled.div`
  padding-top: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StyledTitle = styled.h1`
  text-align: center;
  font-size: 64px;
  line-height: 0.75;
  font-weight: 400;
  ${media.phablet`font-size: 52px;`};
  margin-bottom: 0.25em;
`;
const StyledNavLinks = styled.div`
  align-items: center;
`;
const StyledNavList = styled.ol`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;
const StyledNavListItem = styled.li`
  margin: 0 10px;
`;
const StyledNavListLink = styled.a`
  padding: 0 12px;
  text-decoration: ${props => props.selected ? 'underline' : 'none'};
`;

const snackbarOptions = {
  position: 'bottom-right',
  style: {
    backgroundColor: 'white',
    border: '1px solid black',
    color: 'black',
  },
  closeStyle: {
    color: 'black',
  }
}

const MainPage = () => {
  const [nominations, setNominations] = useState([]);
  const [search, setSearch] = useState(true);
  const [theme, setTheme] = useState('light');
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarOptions);
  const [initialQuery, setinitialQuery] = useState('');
  const [infoDialog, setInfoDialog] = useState(false);

  const queryData = queryString.parse(window.location.search, { arrayFormat: 'bracket' });

  useEffect(async () => {
    const data = queryString.parse(window.location.search, { arrayFormat: 'bracket' });
    if (data.n) {
      const array = data.n;
      const tmp = [];

      console.log(array);

      const responses = await Promise.all(
        array.map(n => axios(`https://www.omdbapi.com/?i=${n}&type=movie&apikey=${process.env.REACT_APP_OMDB_API_KEY_2}`))
      );

      responses.forEach(response => {
        if (response.data.Response === 'True') {
          tmp.push(response.data);
        }
      });
      if (tmp.length !== 0) {
        setNominations(tmp);
        if (!data.s) {
          setSearch(false);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const nominate = (nomination) => {
    if (!isNominated(nomination)) {
      let tmp = [...nominations];
      tmp.push(nomination);
      setNominations(tmp);
      if (tmp.length === 5) {
        openSnackbar("You've made 5 nominations!");
      }
      updateUrl(tmp);
    }
  }

  const unNominate = (nomination) => {
    let tmp = [...nominations];
    const index = tmp.indexOf(nomination);
    if (index > -1)
      tmp.splice(index, 1);
    setNominations(tmp);
    updateUrl(tmp);
  }

  const isNominated = (id) => nominations.filter(n => n.imdbID === id).length > 0;

  const updateUrl = (noms) => {
    const data = queryString.parse(window.location.search, { arrayFormat: 'bracket' });

    const nids = noms.map(n => n.imdbID);
    const str = `n[]=${nids.join('&n[]=')}`;

    if (data.s) {
      window.history.pushState('', '', `${window.location.origin}/?s=${data.s}&${str}`);
    } else {
      window.history.pushState('', '', `${window.location.origin}/?${str}`);
    }
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledInfoBox>
        <Button onClick={toggleTheme}>
          {theme === 'light' ? <Brightness3 /> : <Brightness7 />}
        </Button>
        <Button onClick={() => setInfoDialog(true)}>
          <InfoCircle />
        </Button>
      </StyledInfoBox>
      <StyledRoot>
        <motion.div
          initial={{
            opacity: 0,
            y: -50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            ease: "easeOut",
            duration: 0.3,
            delay: 0.2
          }}
        >
          <StyledTitle>The Shoppies</StyledTitle>
        </motion.div>
        <StyledNavLinks>
          <StyledNavList>
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                ease: "easeOut",
                duration: 0.3,
                delay: 0.5
              }}
            >
              <StyledNavListItem>
                <StyledNavListLink onClick={() => setSearch(true)} selected={search}>
                  Search
                </StyledNavListLink>
              </StyledNavListItem>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                ease: "easeOut",
                duration: 0.3,
                delay: 0.65
              }}
            >
              <StyledNavListItem>
                <StyledNavListLink onClick={() => setSearch(false)} selected={!search}>
                  {`Nominations (${nominations.length})`}
                </StyledNavListLink>
              </StyledNavListItem>
            </motion.div>
          </StyledNavList>
        </StyledNavLinks>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            ease: "easeOut",
            duration: 0.5,
            delay: 0.95
          }}
        >
          <div style={{
            display: "flex"
          }}>
            <AnimatePresence exitBeforeEnter>
              {search && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -100,
                    transition: {
                      ease: "easeInOut",
                      duration: 0.3,
                    }
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      ease: "easeInOut",
                      duration: 0.3,
                      delay: 0.35,
                    }
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                    transition: {
                      ease: "easeInOut",
                      duration: 0.3,
                    }
                  }}
                >
                  <Search
                    initialQuery={queryData.s}
                    nominate={nominate}
                    unNominate={unNominate}
                    isNominated={isNominated}
                    updateUrl={updateUrl}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
              {!search && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 100,
                    transition: {
                      ease: "easeInOut",
                      duration: 0.3,
                    }
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      ease: "easeInOut",
                      duration: 0.3,
                      delay: 0.35,
                    }
                  }}
                  exit={{
                    opacity: 0,
                    x: 100,
                    transition: {
                      ease: "easeInOut",
                      duration: 0.3,
                    }
                  }}
                >
                  <Nominations
                    nominations={nominations}
                    unNominate={unNominate}
                    isNominated={isNominated}
                    updateUrl={updateUrl}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </StyledRoot>
      <InfoDialog isOpen={infoDialog} onClose={() => setInfoDialog(false)}/>
    </ThemeProvider>
  );
}

export default MainPage;