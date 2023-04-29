import styled from 'styled-components';

const StyledDetails = styled.details`
  padding: 2rem 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.color.primary};
  & summary {
    cursor: pointer;
    list-style: none;

    & > * {
      display: inline;
    }
  }

  & summary::-webkit-details-marker {
    display: none;
  }

  & summary::before {
    content: '';
    background-image: url('./keyboard_arrow.svg');
    background-size: 20px 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    margin-right: 12px;
  }

  &[open] summary::before {
    transform: rotate(180deg);
  }
`;

export default StyledDetails;
