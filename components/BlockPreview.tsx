import React from 'react';

type Props = {
  color?: string;
  dashed?: boolean;
};

export default function BlockPreview({
  color = '#fff',
  dashed = false,
}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <g>
        <path
          style={{
            fill: color,
            stroke: 'black',
            strokeWidth: '40',
            strokeDasharray: dashed ? '77.6157,38.8078' : undefined,
          }}
          d="M413.5,400h-315c-31.5,0-57-25.5-57-57V138.5c0-31.5,25.5-57,57-57h315c31.5,0,57,25.5,57,57V343 C470.5,374.5,445,400,413.5,400z"
        />
      </g>
    </svg>
  );
}
