import React from 'react';

interface TikTokLogoProps {
  className?: string;
  size?: number;
}

export const TikTokLogo: React.FC<TikTokLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.138-1.009 6.244 6.244 0 0 1-1.856-4.295h-3.397v14.89c0 2.109-1.736 3.845-3.845 3.845-2.109 0-3.845-1.736-3.845-3.845s1.736-3.845 3.845-3.845c.385 0 .753.058 1.102.167v-3.49A7.31 7.31 0 0 0 8.642 7.5c-4.033 0-7.312 3.279-7.312 7.312s3.279 7.312 7.312 7.312c4.033 0 7.312-3.279 7.312-7.312V8.676c1.384 1.02 3.054 1.574 4.7 1.574v-3.397c-.472 0-.93-.105-1.333-.291z"/>
    </svg>
  );
};

export default TikTokLogo; 