export const reviewCount =  (reviewCount) => {
  if (reviewCount < 1000) {
    return `${reviewCount} reviews`;
  } else {
    return `${reviewCount / 1000}k reviews`;
  }
};
