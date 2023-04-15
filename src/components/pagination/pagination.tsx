import { numberWithCommas } from '../../lib/utils';
import StyledLink from '../ui/styledLink';
import Image from 'next/image';

export default function Pagination(props: PaginationProps) {
  return (
    <nav>
      {props.prevHref && (
        <StyledLink href={props.prevHref}>
          <Image src="/arrow-right.svg" height={20} width={20} alt="next page" />
          Prev page
          <span>
            <br />
            {props.nextPageNumber - 2} of {props.totalPages}
          </span>
        </StyledLink>
      )}

      {props.nextPageNumber <= props.totalPages && (
        <StyledLink href={props.nextHref} shallow={props.shallow && true}>
          Next page
          <span>
            <br />
            {props.nextPageNumber} of {numberWithCommas(props.totalPages)}
          </span>
        </StyledLink>
      )}
    </nav>
  );
}
