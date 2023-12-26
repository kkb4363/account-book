import styled from "styled-components";
import { fullScreen } from "../../styled/styled";

const OverlayWrapper = styled.div`
  ${fullScreen};
  height: 100%;
  position: absolute;
  inset: 0;
  background: rgb(0, 0, 0, 0.3);
`;

const Overlay = (props) => {
  return <OverlayWrapper onClick={props.onClose} />;
};

export default Overlay;
