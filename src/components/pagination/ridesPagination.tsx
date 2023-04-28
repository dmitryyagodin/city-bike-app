import { ArrowIcon, Col, StyledButton } from '@components';
import { numberWithCommas } from '../../lib/utils';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { RidesContext } from 'src/context/ridesContext';

const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 24px;
  text-align: center;
  padding: 12px 8px;
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
      <Col mobileS={6}>
        {prevPageNumber > 0 && (
          <StyledButton
            className="ml-auto"
            onClick={handlePagination}
            data-prev-btn
            disabled={isLoading}
          >
            <ArrowIcon className="icon--left" />
            Prev page
            <br />
            {numberWithCommas(prevPageNumber)} of {numberWithCommas(totalPages)}
          </StyledButton>
        )}
      </Col>
      <Col mobileS={6}>
        {nextPageNumber <= totalPages && (
          <StyledButton onClick={handlePagination} data-next-btn disabled={isLoading}>
            Next page
            <br />
            {numberWithCommas(nextPageNumber)} of {numberWithCommas(totalPages)}
            <ArrowIcon className="icon--right" />
          </StyledButton>
        )}
      </Col>
    </StyledNav>
  );
}

export default RidesPagination;
