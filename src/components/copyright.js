import React from 'react';
import styled from 'styled-components';

const StyledCopyright = styled.a`
  display:block;
  text-align: center;
  font-size: 0.8em;
  flex-direction: column;
`;

export const Copyright = () => (
  <StyledCopyright
    href="https://howardt12345.com"
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    <div>{`© ${new Date().getFullYear()} Howard Tseng`}</div>
  </StyledCopyright>
);