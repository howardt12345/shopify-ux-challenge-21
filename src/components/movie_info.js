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
  margin: 1.5em auto;
`;

const ImageContainer = styled.div`
  padding: 16px 16px;
`;
const Image = styled.img`
  width: 150px;
  ${media.tablet`width: 20vw`};
`;
const InfoContainer = styled.div`
`;

export const MovieInfo = (props) => {
  const { title, year, id, poster } = props;

  return (
    <RootContainer>
      <ImageContainer>
        {poster !== 'N/A' ? 
        <Image
          src={poster}
          alt={'Movie Poster'}
        /> : 
        <Image
          src={'https://via.placeholder.com/300x396.png?text=No%20Movie%20Poster'}
          alt={'Placeholder Movie Poster'}
        />}
      </ImageContainer>
      <InfoContainer>
        <h3>{title}</h3>
        <h5>{year}</h5>
      </InfoContainer>
    </RootContainer>
  );
}