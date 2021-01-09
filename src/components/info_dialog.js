import React, { useContext } from 'react';
import { Dialog } from '@reach/dialog';
import "@reach/dialog/styles.css"
import styled, { ThemeContext } from 'styled-components';
import { Github } from 'styled-icons/boxicons-logos';

import { media } from '../styles';
import { IconButton, Copyright } from '../components';

const StyledDialog = styled(Dialog)`
  width: 600px;
  ${media.tablet`width: 80vw;`};
  background-color: ${props => props.theme.bg}
`;
const StyledContainer = styled.div`
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 0.5rem;
`;
const StyledTitle = styled.h1`
  font-size: 2rem;
  text-align: left;
  line-height: 1;
`;
const StyledInfoContent = styled.p`
  text-align: left;
  line-height: 1.5;
`;

export const InfoDialog = ({ isOpen, onClose }) => {

  const themeContext = useContext(ThemeContext);

  return (
    <StyledDialog
      isOpen={isOpen}
      onDismiss={onClose}
      theme={themeContext}
    >
      <StyledContainer aria-label={'info-dialog'}>
        <StyledTitle>About</StyledTitle>
        <StyledInfoContent>Created by Howard Tseng for the Shopify UX Developer Intern & Web Developer Intern (Summer 2021) Challenge. This project uses React and Styled Components, with animations handled by Framer Motion. The website is hosted on Firebase, and Dynamic Links are used for the sharing feature.</StyledInfoContent>
        <IconButton 
          href="https://github.com/howardt12345/shopify-ux-challenge-21"
          target="_blank"
          rel="nofollow noopener noreferrer">
          <Github />
        </IconButton>
        <Copyright />
      </StyledContainer>
      <button onClick={onClose}>Close</button>
    </StyledDialog>
  );
}