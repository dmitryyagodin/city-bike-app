interface FormatOptions {
  day: '2-digit';
  month: 'short';
  weekday: 'short';
  hour: 'numeric';
  minute: 'numeric';
  second: 'numeric';
  hour12: true | false;
  hourCycle: 'h23';
}

export function formatDate(date: Date): string {
  const formatOptions: FormatOptions = {
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

export function getNextPageUrl(router, skip: number): string {
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
