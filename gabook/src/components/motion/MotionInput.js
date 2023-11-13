import styled, { keyframes } from 'styled-components';
import Overlay from '../common/Overlay';

const motionInput_keyframes = keyframes`
  from{
    transform:translateY(400px);
  }
  to{
    transform:translateY(0);
  }
`;

const MotionInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;

  width: ${({ $width }) => ($width ? $width : '100vw')};
  height: ${({ $height }) => ($height ? $height : ' 50vh')};
  background: white;
  position: absolute;
  bottom: 0;
  z-index: 1;
  animation: ${motionInput_keyframes} 0.5s ease-in-out;

  @media screen and (min-width: 1000px) {
    height: ${({ $height }) => ($height ? `calc(${$height} * 1.3)` : 'calc(50vh * 1.3)')};
  }
`;

const MotionInputs = (props) => {
  return (
    <>
      <MotionInputWrapper $height={props.height}>{props.children}</MotionInputWrapper>
      <Overlay onClose={props.onClose} />
    </>
  );
};

export default MotionInputs;
