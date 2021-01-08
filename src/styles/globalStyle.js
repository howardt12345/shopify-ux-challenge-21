import { createGlobalStyle} from "styled-components"

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all 0.2s linear;
  }
  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    cursor: pointer;
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.accent};
    }
  }
  
  button {
    cursor: pointer;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    line-height: 1;
    padding: 0.75rem 1rem;
    &:disabled {
      color: ${({ theme }) => hex2rgba(theme.text, 0.5)};
      cursor: not-allowed;
    }
    &:hover,
    &:focus,
    &:active {
      background-color: ${({ theme }) => hex2rgba(theme.accent, 0.07)};
      outline: none;
    }
    &:after {
      display: none !important;
    }
  }
`

export default GlobalStyles;