export const stringsUtils = {
  makeArcronyms: function (words: string) {
    return words
      .toLowerCase()
      .replaceAll("of", "")
      .replaceAll("and", "")
      .replaceAll("&", "")
      .split(" ")
      .map((i) => i.charAt(0))
      .join("")
      .toUpperCase();
  },
};
