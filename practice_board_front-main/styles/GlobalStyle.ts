import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    vertical-align: top;
    width: 100%;
  }

  ul {
    list-style: none;
  }

  .blind {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    /* overflow: hidden; */
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default GlobalStyle;
