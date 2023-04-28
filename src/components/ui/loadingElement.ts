import { css } from 'styled-components';

const LoadingElement = css`
  background-color: #fff5ff;
  position: relative;
  overflow: hidden;
  color: transparent;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(75, 0, 130, 0) 0,
      rgba(75, 0, 130, 0.1) 20%,
      rgba(75, 0, 130, 0.3) 60%,
      rgba(75, 0, 130, 0.1) 80%,
      rgba(75, 0, 130, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default LoadingElement;
