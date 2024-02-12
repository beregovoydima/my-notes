import {lightColors} from '@/assets/config/colors';

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

export const styleColorArr = [
  lightColors.purpleDeep,
  lightColors.deepOrangeColor,
  lightColors.yellowAccent,
  lightColors.lime,
  lightColors.cian,
  lightColors.success,
  lightColors.info,
  lightColors.orangeColor,
  lightColors.blueGrey,
];
