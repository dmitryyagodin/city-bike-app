import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 32px;

  & td,
  & th,
  & caption {
    padding: 6px 8px;
  }

  & caption {
    display: table-caption;
    font-size: 1.8rem;
    font-weight: 800;
  }

  & td {
    text-align: center;
  }

  @media (max-width: 768px) {
    & thead {
      display: none;
    }

    display: block;
    width: 100%;

    & tbody,
    & tr,
    & td,
    & caption {
      display: block;
      width: 100%;
    }

    & tr {
      margin-bottom: 15px;
    }

    & td {
      text-align: left;
      padding-left: 50%;
      position: relative;
    }
    & td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-right: 15px;
      padding-left: 15px;
      font-weight: 700;
      text-align: right;
    }
  }
`;

export default StyledTable;
