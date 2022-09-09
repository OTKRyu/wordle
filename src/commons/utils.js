import axios from "axios";

export function checkWord(word) {
  let result = axios({
    method: "GET",
    url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  });
  return result;
}

export function hash(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
