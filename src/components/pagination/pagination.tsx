import styled from 'styled-components';
import { getNavPageUrl, numberWithCommas } from '../../lib/utils';
import { ArrowIcon, StyledLink } from '@components';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { StationContext } from 'src/context/stationContext';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  column-gap: 24px;
  text-align: center;
`;

export default function Pagination({ shallow }: { shallow: boolean }) {
  const router = useRouter();

  const {
    setCurrentStations,
    filteredStations,
    allStations,
    skip,
    setSkipNumber,
    stationsCount,
    stationsOnPage,
  } = useContext(StationContext);

  const prevHref = skip > stationsOnPage ? getNavPageUrl(router, skip - stationsOnPage * 2) : '';
  const nextHref = getNavPageUrl(router, skip);
  const nextPageNumber = skip / stationsOnPage + 1;
  const totalPages = Math.ceil(stationsCount / stationsOnPage);

  useEffect(() => {
    const { skip, filter } = router.query;

    const currentSkip = Number(skip) || 0;
    const newSkip = currentSkip + stationsOnPage;
    setSkipNumber(newSkip);

    if (typeof skip === 'string' && typeof filter === 'undefined') {
      setCurrentStations(allStations.slice(currentSkip, newSkip));
    } else if (typeof skip === 'string' && typeof filter === 'string') {
      setCurrentStations(filteredStations.slice(currentSkip, newSkip));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.skip, router.query.filter]);

  return (
    <StyledNav>
      <h2>{numberWithCommas(stationsCount) || 'No'} results</h2>
      {prevHref && (
        <StyledLink href={prevHref} shallow={shallow && true}>
          <ArrowIcon className="nav__arrow-icon--left" />
          <p>
            Prev page
            <br />
            {nextPageNumber - 2} of {totalPages}
          </p>
        </StyledLink>
      )}

      {nextPageNumber <= totalPages && (
        <StyledLink href={nextHref} shallow={shallow && true}>
          <p>
            Next page
            <br />
            {nextPageNumber} of {numberWithCommas(totalPages)}
          </p>
          <ArrowIcon className="nav__arrow-icon--right" />
        </StyledLink>
      )}
    </StyledNav>
  );
}
