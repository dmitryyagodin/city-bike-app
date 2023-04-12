import Link from 'next/link';
import { numberWithCommas } from '../lib/utils.ts';

export default function Pagination(props: PaginationProps) {
  // console.log('Pagination props');
  // console.log(props);
  return (
    <nav>
      {props.prevHref && (
        <Link href={props.prevHref}>
          Prev page
          <span>
            {props.nextPageNumber - 2} of {props.totalPages}
          </span>
        </Link>
      )}

      {props.nextPageNumber <= props.totalPages && (
        <Link href={props.nextHref} shallow={props.shallow && true}>
          Next page
          <span>
            {props.nextPageNumber} of {numberWithCommas(props.totalPages)}
          </span>
        </Link>
      )}
    </nav>
  );
}
