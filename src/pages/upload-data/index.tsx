import type { NextPage } from 'next';

const UploadData: NextPage = () => {
  return (
    <div>
      <h1>City-bike-app</h1>
      <h2>Import csv file to mysql</h2>
      <form action="api/form" method="post" encType="multipart/form-data">
        <label htmlFor="csv-file">Choose file:</label>
        <input type="file" accept=".csv" id="csv-file" name="csv-file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadData;
