import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';
import './index.css';

export function ColorButton({btnColor, index, changeText}) {

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(btnColor)

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.hex);
    setDisplayColorPicker(false);
    changeText(color.hex, index);
  };

  return (
    <div className='colorContainer'>
      <div className="swatch" onClick={handleClick}>
        <div className="color" style={{backgroundColor: color}} />
      </div>
      {displayColorPicker ? <div className="popover">
        <div className="cover" onClick={handleClose}/>
        <TwitterPicker color={ color } onChange={handleChange} />
      </div> : null }
    </div>
  );
}
