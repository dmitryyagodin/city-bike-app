import Link from 'next/link';

export default function Pagination(props) {
  return (
    <nav>
      <Link href={props.href}>
        Next page
        <span>
          {props.nextPageNumber} of {props.totalPages}
        </span>
      </Link>
    </nav>
  );
}
