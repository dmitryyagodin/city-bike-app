import { ArrowIcon, StyledLink } from '@components';
import { numberWithCommas } from '../../lib/utils';
import styled from 'styled-components';
import React from 'react';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  column-gap: 24px;
  text-align: center;
`;

function RidesPagination(props: RidesPaginationProps) {
  return (
    <StyledNav>
      {props.prevHref && (
        <StyledLink href={props.prevHref} shallow={props.shallow && true}>
          <ArrowIcon className="nav__arrow-icon--left" />
          <p>
            Prev page
            <br />
            {numberWithCommas(props.nextPageNumber - 2)} of {numberWithCommas(props.totalPages)}
          </p>
        </StyledLink>
      )}

      {props.nextPageNumber <= props.totalPages && (
        <StyledLink href={props.nextHref} shallow={props.shallow && true}>
          <p>
            Next page
            <br />
            {numberWithCommas(props.nextPageNumber)} of {numberWithCommas(props.totalPages)}
          </p>
          <ArrowIcon className="nav__arrow-icon--right" />
        </StyledLink>
      )}
    </StyledNav>
  );
}

export default RidesPagination;
