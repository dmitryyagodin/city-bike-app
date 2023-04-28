import styled from 'styled-components';

const Container = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;

  @media ${({ theme }) => theme.device.mobileS} {
    width: ${({ theme }) => theme.containerSize.xs};
 }
 @media ${({ theme }) => theme.device.mobileL} {
   width: ${({ theme }) => theme.containerSize.sm};
}
  @media ${({ theme }) => theme.device.tablet} {
    width: ${({ theme }) => theme.containerSize.md};
 }
  @media ${({ theme }) => theme.device.laptopS} {
    width: ${({ theme }) => theme.containerSize.lg};
 }
  @media ${({ theme }) => theme.device.laptopL} {
    width: ${({ theme }) => theme.containerSize.xl};
 }
  @media ${({ theme }) => theme.device.desktop} {
    width: ${({ theme }) => theme.containerSize.xxl};
 }
`;

export default Container;