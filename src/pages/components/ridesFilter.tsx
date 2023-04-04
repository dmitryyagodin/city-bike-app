import { useRouter } from 'next/router';

export default function RidesFilter() {
  const router = useRouter();
  const { pathname } = router;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    const queryKey = e.target.name;
    const queryVal = e.target.value;
    router.push(`${pathname}?${queryKey}=${queryVal}`, undefined, { shallow: true });
  };

  return (

        <label htmlFor="order-by">Order by
        <select onChange={handleSelect} name="orderBy" id="order-by" defaultValue="date">
          <option value='' hidden></option>
          <option value="departureTime-asc">Departure (oldest)</option>
          <option value="departureTime-desc">Departure (newest)</option>
          <option value="distance-asc">Distance (shortest)</option>
          <option value="distance-desc">Distance (longest)</option>
          <option value="duration-asc">Duration (shortest)</option>
          <option value="duration-desc">Duration (longest)</option>
        </select>
        </label>
  );
}