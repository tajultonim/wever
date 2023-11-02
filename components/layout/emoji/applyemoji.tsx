import emojis from "../../../emojis.json";
import * as runes from "runes";
import Emoji from "./component";

const applyemoji = (str: string) => {
  return runes(str).map((c, i) => {
    let emj = emojis.find((e) => e.char == c);
    if (emj) {
      return <Emoji key={i} emoji={c} />;
    } else {
      return c;
    }
  });
};

export default applyemoji;
