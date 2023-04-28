import { ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';
import getCSSWidthString from 'src/lib/getCSSWidthString';

const baseColor = {
  black: '#282828',
  white: '#FFFFFF',
  darkGray: '#757575',
  gray800: '#C0C0C0',
  gray700: '#DDDDDD',
  gray500: '#F0F0F0',
  gray400: '#FAFAFA',
};

const color = {
  ...baseColor,
  primary:'#4B0082',
  secondary: '#B52B04',
  accent: '#E1FC17',
  accent2: '#49FCF9',
  pinky: '#FFF5FF',
};

const containerSize = {
  xs: '100%',
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  xxl: '1360px',
};

const breakPoint = {
  xs: '360px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1440px',
};

const device = {
  mobileS: `(min-width: ${breakPoint.xs})`,
  mobileL: `(min-width: ${breakPoint.sm})`,
  tablet: `(min-width: ${breakPoint.md})`,
  laptopS: `(min-width: ${breakPoint.lg})`,
  laptopL: `(min-width: ${breakPoint.xl})`,
  desktop: `(min-width: ${breakPoint.xxl})`,
};

const theme = {
  color,
  device,
  containerSize,
};

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProviderContainer ( props: ThemeProviderProps) {
  const { children } = props;
 
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export { ThemeProviderContainer as ThemeProvider };
