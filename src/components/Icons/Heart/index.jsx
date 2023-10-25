/* eslint-disable import/first */
import React from 'react';

export default function Heart(props) {
  const { fill = 'transparent', stroke = '#DE0000', base = '#DE0000' } = props;
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.83843 9.06698C0.865434 6.02921 2.00346 2.25241 5.19266 1.22592C6.87023 0.684564 8.94044 1.13615 10.1166 2.7584C11.2256 1.0763 13.3556 0.688192 15.0314 1.22592C18.2197 2.25241 19.3641 6.02921 18.392 9.06698C16.8776 13.8821 11.5937 16.3903 10.1166 16.3903C8.6403 16.3903 3.40355 13.9383 1.83843 9.06698Z"
        fill={fill}
        stroke={base}
        strokeWidth="1.63223"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5059 4.63972C14.6004 4.75217 15.285 5.61997 15.2442 6.83598"
        stroke={stroke}
        strokeWidth="1.63223"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
