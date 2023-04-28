import getCSSWidthString from 'src/lib/getCSSWidthString';
import styled from 'styled-components';

interface IColumn {  
  mobileS?: number;
  mobileL?: number;
  tablet?: number;
  laptopS?: number;
  laptopL?: number;
  desktop?: number;
}

const Col = styled.div<IColumn>`
  float: left;
  width: 100%;

  @media ${({ theme }) => theme.device.mobileS} {
    width: ${({ mobileS }) => mobileS && getCSSWidthString(mobileS)};
 }
  @media ${({ theme }) => theme.device.mobileL} {
    width: ${({ mobileL }) => mobileL && getCSSWidthString(mobileL)};
 }
  @media ${({ theme }) => theme.device.tablet} {
    width: ${({ tablet }) => tablet && getCSSWidthString(tablet)};
 }
  @media ${({ theme }) => theme.device.laptopS} {
    width: ${({ laptopS }) => laptopS && getCSSWidthString(laptopS)};
 }
  @media ${({ theme }) => theme.device.laptopL} {
    width: ${({ laptopL }) => laptopL && getCSSWidthString(laptopL)};
 }
  @media ${({ theme }) => theme.device.desktop} {
    width: ${({ desktop }) => desktop && getCSSWidthString(desktop)};
 }
`;

export default Col;
