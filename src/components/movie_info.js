import React from 'react';
import styled from 'styled-components';

import { media } from '../styles';

const RootContainer = styled.div`
  display: flex;
  width: 500px;
  ${media.tablet`width: 75vw`};
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 0.25em;
  margin: 0 auto 1.5em;
  padding: 16px 16px;
  position: relative;
`;
const MovieName = styled.h3`
  font-weight: 600;
`;
const MovieYear = styled.h5`
  font-weight: 400;
`;
const ImageContainer = styled.div`
  margin: 0 16px 0 0;
`;
const Image = styled.img`
  width: 125px;
  ${media.tablet`width: 15vw`};
`;
const InfoContainer = styled.div`
  padding-bottom: 32px;
`;

export const MovieInfo = ({ search, movie, nominate, isNominated, unNominate }) => {

  const { Title, Year, imdbID, Poster } = movie;

  return (
    <RootContainer key={imdbID}>
      <ImageContainer>
        {Poster !== 'N/A' ?
          <Image
            src={Poster}
            alt={'Movie Poster'}
          /> :
          <Image
            src={'https://via.placeholder.com/300x396.png?text=No%20Movie%20Poster'}
            alt={'Placeholder Movie Poster'}
          />}
      </ImageContainer>
      <InfoContainer>
        <MovieName>{Title}</MovieName>
        <MovieYear>{Year}</MovieYear>
      </InfoContainer>
      <button
        style={{
          position: 'absolute',
          right: '16px',
          bottom: '16px'
        }}
        onClick={() => !isNominated ? nominate(movie) : unNominate(movie)}
        disabled={search ? isNominated : !isNominated}
      >
        {search ? "Nominate" : "Remove"}
      </button>
    </RootContainer>
  );
}