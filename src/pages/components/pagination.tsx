import Link from 'next/link';

export default function Pagination({currentPath, nextPageNumber, totalPages}) {
  const nextPageUrl = currentPath.includes('?') ?
   currentPath + `&page=${nextPageNumber}` : currentPath + `?skip=${nextPageNumber}`;
  
  return (
    <nav>
       <Link href={nextPageUrl}>
        Next page<br/>
        <span>{nextPageNumber} of {totalPages}</span>
       </Link>    
    </nav>
  );  
}