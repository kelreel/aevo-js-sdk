export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const randomInt = (max = 10 ** 6, min = 0): number => {
  const floatRandom = Math.random();

  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
};
