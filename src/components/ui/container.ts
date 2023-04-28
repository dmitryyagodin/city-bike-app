import styled from 'styled-components';

const containerSize = {
  xs: '320px',
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  xxl: '1320px',
};

const breakPoint = {
  xs: '360px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1440',
};

export const device = {
  mobileS: `(min-width: ${breakPoint.xs})`,
  mobileL: `(min-width: ${breakPoint.sm})`,
  tablet: `(min-width: ${breakPoint.md})`,
  laptopS: `(min-width: ${breakPoint.lg})`,
  laptopL: `(min-width: ${breakPoint.xl})`,
  desktop: `(min-width: ${breakPoint.xxl})`,
};

const Container = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;

  @media ${device.mobileS} {
    width: ${containerSize.xs};
  }
  @media ${device.mobileL} {
    width: ${containerSize.sm};
  }
  @media ${device.tablet} {
    width: ${containerSize.md};
  }
  @media ${device.laptopS} {
    width: ${containerSize.lg};
  }
  @media ${device.laptopL} {
    width: ${containerSize.xl};
  }
  @media ${device.desktop} {
    width: ${containerSize.xxl};
  }
`;

export default Container;
