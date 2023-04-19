export function formatDate(date: Date): string {
  const formatOptions: DateFormatOptions = {
    day: '2-digit',
    month: 'short',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    hourCycle: 'h23',
  };

  return date.toLocaleString('EN-GB', formatOptions);
}

export function getDuration(seconds: number): string {
  return (seconds / 60).toFixed(1);
}

export function getNavPageUrl(router: NextRouter, skip: number): string {
  let href = router.asPath;
  if (router.query.skip) {
    href = href.replace(/skip=\d+/, `skip=${skip}`);
  } else if (href.includes('?')) {
    href += `&skip=${skip}`;
  } else {
    href += `?skip=${skip}`;
  }
  return href;
}

export function numberWithCommas(num: number): string {
  if (num && Number.isInteger(num)) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '';
  }
}

export function updateSearchParams(e, router) {
  const { pathname } = router;
  const value = e.target.value.toLowerCase();
  const newQuery = { [e.target.name]: value };

  const query = { ...router.query, ...newQuery };

  if (!value) {
    delete query[e.target.name];
  }

  router.push(
    {
      pathname,
      query: query,
    },
    undefined,
    { shallow: true }
  );
}
