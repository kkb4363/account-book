import styled from 'styled-components';

const OverlayWrapper = styled.div`
  position: absolute;
  inset: 0;
  background: rgb(0, 0, 0, 0.3);

  width: 100vw;
  height: 100vh;
`;

const Overlay = (props) => {
  return <OverlayWrapper onClick={props.onClose} />;
};

export default Overlay;
