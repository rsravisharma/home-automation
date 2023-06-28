// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

const FONT_PRIMARY = "'Public Sans', sans-serif"; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 300,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(30),
    ...responsiveFontSizes({ sm: 42, md: 48, lg: 54 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 30, md: 34, lg: 38 }),
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 22, md: 25, lg: 26 }),
  },
  h4: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ sm: 14, md: 18, lg: 20 }),
  },
  h5: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 12, md: 13, lg: 15 }),
  },
  h6: {
    fontWeight: 500,
    lineHeight: 28 / 18,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
  },
  subtitle1: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(10),
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: pxToRem(8),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(10),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(10),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(10),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 500,
    lineHeight: 24 / 14,
    fontSize: pxToRem(12),
    textTransform: 'capitalize',
  },
};

export default typography;