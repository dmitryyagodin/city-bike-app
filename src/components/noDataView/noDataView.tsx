import type { NextPage } from 'next';

type Props = {
  message: string;
};

const NoDataView: NextPage<Props> = ({ message }) => {
  return (
    <>
      <p>{message}</p>
    </>
  );
};

export default NoDataView;
