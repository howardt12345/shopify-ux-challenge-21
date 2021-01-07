import React from 'react';
import styled from 'styled-components';

import { media } from '../styles';

const RootContainer = styled.div`
  display: flex;
  width: 600px;
  ${media.tablet`width: 75vw`};
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  padding: 16px 16px;
`;
const Image = styled.img`
  width: 150px;
`;
const InfoContainer = styled.div`
`;

export const MovieInfo = (props) => {
  const { title, year, id, poster } = props;

  return (
    <RootContainer>
      <ImageContainer>
        <Image
          src={poster}
          alt={'Movie Poster'}
        />
      </ImageContainer>
      <InfoContainer>
        <h3>{title}</h3>
      </InfoContainer>
    </RootContainer>
  );
}