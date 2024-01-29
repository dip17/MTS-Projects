import React, { useState, useEffect } from 'react';

const Wave = ({ curPercentage, animated, id }) => {
  const [waveLines, setWaveLines] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender || animated) {
      setWaveLines(
        [...Array(18)].map((val, i) => {
          //min 15 max 98
          const height = Math.random() * (98 - 15) + 15;
          return <rect x={i * 15} y={(100 - height) / 2} width="6" height={height} rx="2" ry="2" />
        })
      );
    }
    setFirstRender(false);
  }, [curPercentage]);

  return (
    <svg height="30" width="100" viewBox="0 0 250 100">
      <defs>
        <linearGradient id={`grad1${id}`} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits='userSpaceOnUse'>
          <stop offset="0%" stopColor='#7d05e7' stopOpacity="1" />
          <stop offset={`${curPercentage ? curPercentage : 1}%`} stopColor='#7d05e7' stopOpacity="1" />
          {curPercentage !== 100 ?
            <>
              <stop offset={`${curPercentage ? curPercentage : 1}%`} stopColor='#bac2d6' stopOpacity="1" />
              <stop offset="100%" stopColor='#bac2d6' stopOpacity="1" />
            </>
            : null
          }
        </linearGradient>
      </defs>
      <g fill={`url(#grad1${id})`}>
        {waveLines}
      </g>
    </svg>
  );
}

export default Wave;