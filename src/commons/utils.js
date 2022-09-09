import axios from "axios";

export async function checkWord(word) {
  const result = await axios({
    method: "GET",
    url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  })
    .then((res) => {
      if (res.data.title) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return result;
}

export function func(string) {
  var hash = 0;
  if (string.length == 0) return hash;
  for (x = 0; x < string.length; x++) {
    ch = string.charCodeAt(x);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
