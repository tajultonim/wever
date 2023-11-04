"use client";

import { FC, useState } from "react";
import Image from "next/image";
import emojis from "../../../emojis.json";
import * as runes from "runes";

const Emoji: FC<{ emoji: string }> = ({ emoji }) => {
  let emj = emojis.find((e) => e.char == emoji);
  const [isError, setIsError] = useState(false);
  return (
    <>
      {emj?.["fluent-animated"] && !isError ? (
        <span className="relative aspect-square align-middle -mt-[6px] inline-block box-border ">
          <Image
            alt={emj?.char || emoji}
            fill
            fetchPriority="low"
            quality={1}
            sizes="10vw"
            loading="lazy"
            onError={() => {
              setIsError(true);
            }}
            src={`https://raw.githubusercontent.com/tajultonim/Animated-Fluent-Emojis/master/${emj?.["fluent-animated"]}`}
          />
        </span>
      ) : (
        <>{emoji}</>
      )}
    </>
  );
};

export default Emoji;
