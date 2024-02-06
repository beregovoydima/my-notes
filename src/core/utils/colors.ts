export const hex2rgba = (hex: string, alpha = 1) => {
  if (hex.toLocaleLowerCase().includes('rgb')) {
    const match = hex.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
    );
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r},${g},${b},${alpha})`;
    }
    return hex;
  }
  const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};
