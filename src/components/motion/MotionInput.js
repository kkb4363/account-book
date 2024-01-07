import styled, { keyframes } from "styled-components";
import { flexColumn } from "../../styled/styled";
import Overlay from "../common/Overlay";

const MotionInputs = (props) => {
  return (
    <>
      <MotionInputLayout $height={props.height}>{props.children}</MotionInputLayout>
      <Overlay onClose={props.onClose} />
    </>
  );
};

export default MotionInputs;

const motionInput_keyframes = keyframes`
  from{
    opacity: 0.1;
    transform:translateY(300px);
  }
  to{
    opacity: 1;
    transform:translateY(0);
  }
`;

const MotionInputLayout = styled.div`
  width: ${({ $width }) => ($width ? $width : "100vw")};
  height: ${({ $height }) => ($height ? $height : " 50vh")};
  ${flexColumn};
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  background: white;
  position: absolute;
  bottom: 0;
  z-index: 1;
  animation: ${motionInput_keyframes} 0.2s linear;

  @media screen and (min-width: 1000px) {
    height: ${({ $height }) => ($height ? `calc(${$height} * 1.3)` : "calc(50vh * 1.3)")};
  }
`;
