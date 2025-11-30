import React from 'react';
import './Background.css';
import beerUrl from '../assets/Fon.jpg';

export const Background: React.FC = () => {
  return (
    <div
      className="game-background"
      style={{ backgroundImage: `url(${beerUrl})` }}
    />
  );
};
