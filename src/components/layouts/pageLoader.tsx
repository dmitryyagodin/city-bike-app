import styled from 'styled-components';

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderMarker = styled.div`
  border: 10px solid ${({theme}) => theme.color.background};
  border-radius: 50%;
  border-top: 10px solid ${({theme}) => theme.color.primary};
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PageLoader = () => {
  return (
    <LoaderWrapper>
      <LoaderMarker></LoaderMarker>
    </LoaderWrapper>
  );
};

export default PageLoader;
