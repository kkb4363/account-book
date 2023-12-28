import styled from "styled-components";
import { fullScreen } from "../../styled/styled";

const OverlayLayout = styled.div`
  ${fullScreen};
  height: 100%;
  position: absolute;
  inset: 0;
  background: rgb(0, 0, 0, 0.3);
`;

const Overlay = (props) => {
  return <OverlayLayout onClick={props.onClose} />;
};

export default Overlay;
