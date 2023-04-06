import Link from 'next/link';


export default function Pagination(props: PaginationProps) {
  return (
    <nav>
      {
        props.prevHref &&
        
        <Link href={props.prevHref}>
        Prev page
        <span>
          {props.nextPageNumber - 2} of {props.totalPages}
        </span>
        </Link>

      }
      <Link href={props.nextHref}>
        Next page
        <span>
          {props.nextPageNumber} of {props.totalPages}
        </span>
      </Link>
    </nav>
  );
}
