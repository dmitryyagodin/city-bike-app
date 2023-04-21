import React from 'react';
import styled from 'styled-components';

export const StyledArrowIcon = styled.svg`
  & path {
    fill: #4b0082;
  }
  a:hover & path,
  a:focus & path {
    fill: #fff5ff;
  }

  .nav__arrow-icon--left & {
    transform: rotate(180deg);
  }
`;

const ArrowIcon = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <StyledArrowIcon
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 96 960 960"
        width="24"
      >
        <path d="m561 814-43-42 168-168H160v-60h526L517 375l43-42 241 241-240 240Z" />
      </StyledArrowIcon>
    </div>
  );
};
export default ArrowIcon;