import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import motion from 'framer-motion';

import Search from './search';
import Nominations from './nominations';

import media from '../styles/media';

const queryString = require('query-string');


const StyledRoot = styled.div`
  padding-top: 25vh;
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
  padding: 8px 6px;
`;

const MainPage = () => {
  const [nominations, setNominations] = useState([]);
  const [search, setSearch] = useState(true);

  useEffect(() => {
    if(window.location) {
      console.log(window.location.pathname);
    }
  });

  return (
    <StyledRoot>
      <StyledTitle>The Shoppies</StyledTitle>
      <StyledNavLinks>
        <StyledNavList>
          <StyledNavListItem>
            <StyledNavListLink>
              Search
            </StyledNavListLink>
          </StyledNavListItem>
          <StyledNavListItem>
            <StyledNavListLink>
              Nominations
            </StyledNavListLink>
          </StyledNavListItem>
        </StyledNavList>
      </StyledNavLinks>
    </StyledRoot>
  );
}

export default MainPage;