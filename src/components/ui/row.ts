import styled from 'styled-components';

interface IRow {
  gap?: number;
  justify?: string;
}

const Row = styled.div<IRow>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ gap }) => gap && `${gap}px`};
  justify-content: ${({ justify }) => justify};

  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;

export default Row;
