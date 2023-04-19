import { useRouter } from 'next/router';

export default function RidesFilter() {
  const router = useRouter();
  const { pathname } = router;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = { ...router.query, [e.target.name]: e.target.value };

    router.push(
      {
        pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <details>
      <summary>Sort the rides</summary>
      <label htmlFor="order-by">
        Order by
        <select onChange={handleSelect} name="orderBy" id="order-by" defaultValue="date">
          <option value="" hidden></option>
          <option value="departureTime-asc">Departure (oldest first)</option>
          <option value="departureTime-desc">Departure (newest first)</option>
          <option value="distance-asc">Distance (shortest first)</option>
          <option value="distance-desc">Distance (longest first)</option>
          <option value="duration-asc">Duration (shortest first)</option>
          <option value="duration-desc">Duration (longest first)</option>
        </select>
      </label>
    </details>
  );
}
