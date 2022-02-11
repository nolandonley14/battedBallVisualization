import { useState, useEffect } from 'react';
import { tsv } from 'd3';

const tsvURL = './battedBallData.tsv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.LAUNCH_ANGLE = +d.LAUNCH_ANGLE
      d.EXIT_SPEED = +d.EXIT_SPEED
      d.EXIT_DIRECTION = +d.EXIT_DIRECTION
      d.HIT_DISTANCE = +d.HIT_DISTANCE
      d.HANG_TIME = +d.HANG_TIME
      d.HIT_SPIN_RATE = +d.HIT_SPIN_RATE
      return d;
    };
    tsv(tsvURL, row).then(setData);
  }, []);

  return data;
};
