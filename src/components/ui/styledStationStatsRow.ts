import styled from 'styled-components';

const StyledStationStatsRow = styled.span<{ coloredWidth?: string }>`
  display: inline-block;
  height: 2rem;
  background-color: ${({ theme }) => theme.color.primary};
  width: ${(props) => props.coloredWidth};
  transition: width 1s ease-out;

  .is-loading & {
    width: 0;
    visibility: hidden;
  }
`;

export default StyledStationStatsRow;
