import React from 'react';

interface XLogoProps {
  className?: string;
  size?: number;
}

export const XLogo: React.FC<XLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.99 0h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 19.75H1.68l7.73-8.835L1.254 0H8.08l4.713 6.231L16.99 0zm-1.161 17.52h1.833L7.084 4.126H5.117L15.829 17.52z" />
    </svg>
  );
};

export default XLogo; 