// pages/index.tsx

import React, { useState } from 'react';
import Sentiment from "sentiment";
import WordCloud from './WordCloud';


type WordData = { text: string; value: number };

const generateWordCloudData = (text: string): WordData[] => {
  const words = text.split(/\s+/);
  const frequencyMap: { [key: string]: number } = {};

  words.forEach((word) => {
    const w = word.toLowerCase();
    frequencyMap[w] = (frequencyMap[w] || 0) + 1;
  });

  const wordData: WordData[] = Object.keys(frequencyMap).map((word) => {
    return { text: word, value: frequencyMap[word] };
  });

  return wordData;
}

const analyzeSentiment = (text: string) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  return result;
}

const HomePage: React.FC = () => {
  const [text, setText] = useState('');
  const [sentimentScore, setSentimentScore] = useState(0);
  const [wordCloudData, setWordCloudData] = useState([] as { value: string; count: number }[]);
  
  const handleSubmit = () => {
    const result = analyzeSentiment(text);
    setSentimentScore(result.score);
    
    const wordData = generateWordCloudData(text).map(({ text, value }) => ({ value: text, count: value }));
    setWordCloudData(wordData);
    
    // Calculate pie chart data here...
  };

  return (
    <div className="container">
      <textarea className="textarea" onChange={(e) => setText(e.target.value)} />
      <button className="button" onClick={handleSubmit}>Analyze</button>
      <h1>Sentiment Score: {sentimentScore}</h1>
      <WordCloud words={wordCloudData} />
    </div>
  );
};

export default HomePage;
