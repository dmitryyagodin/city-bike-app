import { ArrowIcon, StyledButton } from '@components';
import { numberWithCommas } from '../../lib/utils';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';

const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 24px;
  text-align: center;
`;

function RidesPagination() {
  const {
    setIsLoading,
    isLoading,
    skipItems,
    setSkipItems,
    itemsOnPage,
    searchParams,
    setSearchParams,
    ridesCount,
  } = useContext(RidesContext);

  const nextPageNumber = skipItems / itemsOnPage + 2;
  const prevPageNumber = nextPageNumber > 1 ? nextPageNumber - 2 : 0;
  const totalPages = Math.ceil(ridesCount / itemsOnPage);

  const handlePagination: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsLoading(true);
    const target = e.currentTarget as HTMLButtonElement;

    const newSkipItems = target.hasAttribute('data-next-btn')
      ? skipItems + itemsOnPage
      : skipItems - itemsOnPage;

    setSkipItems(newSkipItems);
    setSearchParams({ ...searchParams, skip: newSkipItems });
  };

  return (
    <StyledNav>
      {prevPageNumber > 0 && (
        <StyledButton onClick={handlePagination} data-prev-btn disabled={isLoading}>
          <ArrowIcon className="nav__arrow-icon--left" />
          Prev page
          <br />
          {numberWithCommas(prevPageNumber)} of {numberWithCommas(totalPages)}
        </StyledButton>
      )}

      {nextPageNumber <= totalPages && (
        <StyledButton onClick={handlePagination} data-next-btn disabled={isLoading}>
          Next page
          <br />
          {numberWithCommas(nextPageNumber)} of {numberWithCommas(totalPages)}
          <ArrowIcon className="nav__arrow-icon--right" />
        </StyledButton>
      )}
    </StyledNav>
  );
}

export default RidesPagination;
