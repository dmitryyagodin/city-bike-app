import React, { FormEvent, useContext } from 'react';
import {
  SearchByDuration,
  SearchByStationName,
  SearchByDistance,
  StyledButton,
  Col,
} from '@components';
import { RidesContext } from 'src/context/ridesContext';

interface CustomElements extends HTMLFormControlsCollection {
  departure_station: HTMLInputElement;
  return_station: HTMLInputElement;
  min_distance: HTMLInputElement;
  max_distance: HTMLInputElement;
  min_duration: HTMLInputElement;
  max_duration: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

const RidesSearch = ({ stations }: { stations: Station[] }) => {
  const { setSearchParams, searchParams, setIsLoading, isLoading } = useContext(RidesContext);

  function onSubmit(e: FormEvent<CustomForm>) {
    e.preventDefault();
    const target = e.currentTarget.elements;

    const searchQuery = {
      departureStation: target.departure_station.value,
      returnStation: target.return_station.value,
      minDistance: parseInt(target.min_distance.value) | 0,
      maxDistance: parseInt(target.max_distance.value) | 0,
      minDuration: parseInt(target.min_duration.value) | 0,
      maxDuration: parseInt(target.max_duration.value) | 0,
    };

    const andClause = [];

    if (searchQuery.departureStation) {
      andClause.push({ departureStationName: searchQuery.departureStation });
    }

    if (searchQuery.returnStation) {
      andClause.push({ returnStationName: searchQuery.returnStation });
    }

    if (searchQuery.minDistance) {
      andClause.push({ distance: { gte: searchQuery.minDistance * 1000 } });
    }

    if (searchQuery.maxDistance) {
      andClause.push({ distance: { lte: searchQuery.maxDistance * 1000 } });
    }

    if (searchQuery.minDuration) {
      andClause.push({ duration: { gte: searchQuery.minDuration * 60 } });
    }

    if (searchQuery.maxDuration) {
      andClause.push({ duration: { lte: searchQuery.maxDuration * 60 } });
    }

    const whereQuery = {
      where: {
        AND: [...andClause],
      },
    };

    if (andClause.length) {
      setIsLoading(true);
      setSearchParams({ ...searchParams, where: whereQuery.where });
    } else {
      alert('No search options are selected');
      // add better solution
    }
  }

  const handleReset = () => {
    setIsLoading(true);
    setSearchParams({ skip: 0 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={onSubmit}>
        <SearchByStationName stations={stations} />
        <SearchByDistance />
        <SearchByDuration />
        <Col mobileS={6} className="mt-2">
          <StyledButton type="submit" disabled={isLoading}>
            Search
          </StyledButton>
        </Col>
        <Col mobileS={6} className="mt-2">
          <StyledButton onClick={handleReset}>Reset</StyledButton>
        </Col>
      </form>
    </div>
  );
};

export default RidesSearch;
