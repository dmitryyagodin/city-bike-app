import styled from 'styled-components';
import { numberWithCommas } from '../../lib/utils';
import { ArrowIcon, StyledLink } from '@components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  column-gap: 24px;
  text-align: center;
`;

export default function Pagination(props: PaginationProps) {
  return (
    <StyledNav>
      {props.prevHref && (
        <StyledLink href={props.prevHref}>
          <ArrowIcon className="nav__arrow-icon--left" />
          <p>
            Prev page
            <br />
            {props.nextPageNumber - 2} of {props.totalPages}
          </p>
        </StyledLink>
      )}

      {props.nextPageNumber <= props.totalPages && (
        <StyledLink href={props.nextHref} shallow={props.shallow && true}>
          <p>
            Next page
            <br />
            {props.nextPageNumber} of {numberWithCommas(props.totalPages)}
          </p>
          <ArrowIcon className="nav__arrow-icon--right" />
        </StyledLink>
      )}
    </StyledNav>
  );
}
