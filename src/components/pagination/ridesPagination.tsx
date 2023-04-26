import { ArrowIcon, StyledLink } from '@components';
import { getNavPageUrl, numberWithCommas } from '../../lib/utils';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';
import { useRouter } from 'next/router';


const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  column-gap: 24px;
  text-align: center;
`;

function RidesPagination() {
  const { setIsLoading, skipItems, setSkipItems, itemsOnPage, searchParams, setSearchParams, ridesCount } = useContext(RidesContext);
  const router = useRouter();
  
  const prevHref = skipItems > itemsOnPage ? getNavPageUrl(router, skipItems - itemsOnPage * 2) : '';
  const nextHref = getNavPageUrl(router, skipItems);
  const nextPageNumber = skipItems / itemsOnPage + 1;
  const totalPages= Math.ceil(ridesCount / itemsOnPage);

  const handlePagination = () => {
    setIsLoading(true);
    const newSkipItems = skipItems + itemsOnPage;
    setSkipItems(newSkipItems);
    setSearchParams({ ...searchParams, skip: skipItems });
  };


  return (
    <StyledNav>
      {prevHref && ridesCount <= itemsOnPage && (
        <StyledLink
          href={prevHref}
          shallow={false}
          onClick={handlePagination}
        >
          <ArrowIcon className="nav__arrow-icon--left" />
          <p>
            Prev page
            <br />
            {numberWithCommas(nextPageNumber - 2)} of {numberWithCommas(totalPages)}
          </p>
        </StyledLink>
      )}

      {nextPageNumber <= totalPages && (
        <StyledLink
          href={nextHref}
          shallow={false}
          onClick={handlePagination}
        >
          <p>
            Next page
            <br />
            {numberWithCommas(nextPageNumber)} of {numberWithCommas(totalPages)}
          </p>
          <ArrowIcon className="nav__arrow-icon--right" />
        </StyledLink>
      )}
    </StyledNav>
  );
}

export default RidesPagination;
