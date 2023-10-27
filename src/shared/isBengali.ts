// Check if text is in Bengali or not
export const isBengali = (word: string) => {
  const bengaliRegex = /[\u0980-\u09FF]/;
  return bengaliRegex.test(word);
};
