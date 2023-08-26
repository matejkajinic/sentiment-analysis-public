import React from 'react';
import { TagCloud } from 'react-tagcloud';

type WordCloudProps = {
  words: { value: string; count: number }[];
};

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  return <TagCloud minSize={12} maxSize={35} tags={words ?? []} />;
};

export default WordCloud;
