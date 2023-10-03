import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --c-primary: #ffd61f;
    --c-primary-2: #4ba0eb;
    --c-primary-light: #ffd61f;
    --c-primary-light-2: #F0FBFF;

    --c-primary-hv: #ebb521;
    --c-primary-2-hv: #ff9900;
    --c-primary-light-hv: #d7e4ee;
    --c-primary-light-2-hv: #d9e4e7;

    --c-grey-100: #f5f5f5;
    --c-grey-200: #D9D9D9;
    --c-grey: #b3b3b3;
    --c-black: #353535;
    --c-white: #FFF;

    --c-danger: #FF3A3A;
    --c-warn: #FFB03A;
    --c-success: #21D934;
    --c-info: #1832b8;
    
    --f-en: 'Inter';
    --f-th: 'Pridi' ;
    --f-th-2: 'Mali' ;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
    font-size: 62.5%;
    @media (max-width: 56.25em) { font-size: 50%; } ;
    @media (max-width: 75em) {font-size: 56.25%  } ;
    @media (min-width: 112.5em) {font-size: 68%;  } ;
}

body {
  font-family: "Inter";
  color: var(--c-black);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--c-grey-100);
  color: var(--c-grey);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--c-primary);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}



`;

export default GlobalStyles;
