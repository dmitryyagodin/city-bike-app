import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  width: 100%;
  font-size: 1rem;
  background-color: #fff5ff;
  column-gap: 8px;
  color: #4b0082;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  transition: 0.4s;

  & span {
    flex: 1;
  }

  &:focus,
  &:hover {
    color: #fff5ff;
    background-color: #4b0082;

    & svg {
      fill: #fff5ff;
    }
  }

  & svg {
    fill: #4b0082;
    height: 1.1rem;
  }

  &[asc] svg path:nth-child(2) {
    fill-opacity: 0%;
  }
  &[desc] svg path:nth-child(1) {
    fill-opacity: 0%;
  }

  :disabled {
    opacity: 0.7;

    &:hover,
    &:focus,
    &:focus-visible {
      pointer-events: none;
      background-color: #fff5ff;
      color: #4b0082;

      & svg {
        fill: #4b0082;
      }
    }
  }
`;

export default StyledButton;
