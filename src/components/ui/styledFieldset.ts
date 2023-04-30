import styled from 'styled-components';

const StyledFieldset = styled.fieldset`
  border-color: ${({ theme }) => theme.color.primary};
  & legend {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    padding: 3px 6px;

    h2 {
      margin: 0;
    }
  }

  & label {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
`;

export default StyledFieldset;
