function getCSSWidthString(span: number) {
  if (!span) return;

  const width = (span / 12) * 100;
  return `${width}%;`;
}

export default getCSSWidthString;