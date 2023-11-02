import { FC } from "react";

//TODO: Create a card for text and another for text with image for the feed

const FeedTextCard: FC<{
  content: string;
  author: string;
  authorProfile: string;
  likes: string;
  comments: string;
}> = () => {
  return <></>;
};

const FeedImageCard: FC = () => {
  return <></>;
};

export { FeedTextCard, FeedImageCard };
