import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';
import { ColorButton } from './ColorButton';
import './index.css';

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

export function ColorPickerList({colors, setColors}) {

    const [pickers, setPickers] = useState([0,0,0,0,0,0,0,0,0]);

    const getPicker = (index) => {
      if (pickers[index] == 1) {
        return 'block';
      } else {
        return 'none';
      }
    }

    const setPicker = (index) => {
      const p = pickers.slice();
      p[index] = 1;
      setPickers(p);
    }

    const handleChange = (color, index) => {
      const p = pickers.slice();
      p[index] = 0;
      setPickers(p);
      setColors(color, index);
    }

  return (
    <ul className="pickerList"> Color Legend
    {Object.keys(colors).map((c, index) => {
        return (
          <li className="colorRow" key={index}>
            <div style={{'color': colors[c]}} onClick={() => setPicker(index)}>{c}</div>
            <ColorButton btnColor={colors[c]} index={index} changeText={handleChange} />
          </li>
        );
      })}
    </ul>
  );
}
