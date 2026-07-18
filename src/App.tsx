import React from 'react';
import Redesign from './redesign/Redesign';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <Redesign />
      <Analytics />
    </>
  );
}
