// Check if text is in arabic or not
export const isArabic = (word: string) => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(word);
};
