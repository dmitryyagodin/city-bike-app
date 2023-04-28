import styled from 'styled-components';

const StyledInput = styled.input`
  &:invalid {
    border: 3px dashed #b52b04;
  }

  &:valid {
    border: 2px solid ${({ theme }) => theme.color.primary};
  }
`;

export default StyledInput;
