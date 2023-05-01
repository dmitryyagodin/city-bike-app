import styled from 'styled-components';

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 8px;
  margin-right: 12px;

  @media ${({ theme }) => theme.device.mobileL} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  & li {
    width: fit-content;
  }
`;

export default StyledList;
