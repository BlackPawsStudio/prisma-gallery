export const hexConverter = (n: number) => {
  const converted = n.toString(16);
  return converted.length === 1 ? `0${converted}` : converted;
};
