import styled from 'styled-components';

const StyledInput = styled.input`
  &:invalid {
    border: 3px dashed #b52b04;
  }

  &:valid {
    border: 3px solid #4b0082;
  }
`;

export default StyledInput;
