import styled from 'styled-components';

const StyledAside = styled.aside`
  @media ${({ theme }) => theme.device.laptopL} {
    position: sticky;
    top: 5%;
    margin-right: 24px;
  }

  & legend > h2 {
    text-align: center;
  }
`;

export default StyledAside;
