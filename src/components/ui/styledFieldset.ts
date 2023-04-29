import styled from 'styled-components';

const StyledFieldset = styled.fieldset`
  border: none;
  & label {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin: 0 12px;
    max-width: 120px;
  }
`;

export default StyledFieldset;
