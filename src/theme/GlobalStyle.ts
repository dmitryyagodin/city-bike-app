import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    
    html {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
    }

    p {
        margin: 0;
    }
`;

export {GlobalStyle};
