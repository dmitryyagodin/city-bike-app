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
        font-size: 1.2rem;
        font-family: Roboto-400, Helvetica, sans-serif;
        
        @media (min-width: 576px) {
            font-size: 1.4rem;
        }
        
        @media (min-width: 768px) {
            font-size: 1.6rem;
        }
    }

    p {
        margin: 0;
    }

    .ml-auto {
        margin-left: auto;
    }

    .mt-2 {
        margin-top: 12px;
    }
`;

export {GlobalStyle};
