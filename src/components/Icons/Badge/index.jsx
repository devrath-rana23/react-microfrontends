/* eslint-disable import/first */
import React from 'react';

export default function Badge(props) {
  const { fill = '#E4002B', width = '15.6923', height = '17' } = props;
  return (
    <svg
      width="61"
      height="17"
      viewBox="0 0 61 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className || ''}
    >
      <rect width={width} height={height} fill={fill} />
      <rect x="22.2307" width={width} height={height} fill={fill} />
      <rect x="44.4614" width={width} height={height} fill={fill} />
    </svg>
  );
}
