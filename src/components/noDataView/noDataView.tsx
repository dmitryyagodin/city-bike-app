import type { NextPage } from 'next';

type Props = {
  message: string;
};

const NoDataView: NextPage<Props> = ({ message }) => {
  return (
    <>
      <h1></h1>
      <p>{message}</p>
    </>
  );
};

export default NoDataView;
