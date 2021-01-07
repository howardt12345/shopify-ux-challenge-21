import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import Search from './search';
import Nominations from './nominations';

import { GlobalStyle, media, lightTheme, darkTheme, GlobalStyles } from '../styles';


const StyledRoot = styled.div`
  padding-top: 20vh;
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
  margin-bottom: 0.25em
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

const MainPage = () => {
  const [nominations, setNominations] = useState([]);
  const [search, setSearch] = useState(true);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
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
                  Nominations
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
                  <Search />
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
                  <Nominations />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </StyledRoot>
    </ThemeProvider>
  );
}

export default MainPage;