import styled from 'styled-components';
import { getNavPageUrl, numberWithCommas } from '../../lib/utils';
import { ArrowIcon, Col, StyledLink } from '@components';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { StationContext } from 'src/context/stationContext';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  column-gap: 24px;
  text-align: center;
  & a {
    text-decoration: none;
    text-transform: uppercase;

    &:focus,
    &:hover {
      color: #fff5ff;
      background-color: ${({ theme }) => theme.color.primary};

      & svg {
        fill: #fff5ff;
      }
    }
  }

  & svg {
    fill: ${({ theme }) => theme.color.primary};
  }
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
    <StyledNav className="mb-2">
      <Col mobileS={6}>
        {prevHref && (
          <StyledLink className="ml-auto" href={prevHref} shallow={shallow && true}>
            <ArrowIcon className="icon--left" />
            <p>
              Prev page
              <br />
              {nextPageNumber - 2} of {totalPages}
            </p>
          </StyledLink>
        )}
      </Col>

      <Col mobileS={6}>
        {nextPageNumber <= totalPages && (
          <StyledLink href={nextHref} shallow={shallow && true}>
            <p>
              Next page
              <br />
              {nextPageNumber} of {numberWithCommas(totalPages)}
            </p>
            <ArrowIcon className="icon--right" />
          </StyledLink>
        )}
      </Col>
    </StyledNav>
  );
}
