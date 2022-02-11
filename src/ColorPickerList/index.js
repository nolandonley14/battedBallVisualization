import React, { useState } from 'react';
import { ColorButton } from './ColorButton';
import './index.css';

export function ColorPickerList({colors, setColors}) {

    const [pickers, setPickers] = useState([0,0,0,0,0,0,0,0,0]);

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
