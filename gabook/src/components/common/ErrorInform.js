import { BiErrorCircle } from "react-icons/bi";
import styled from "styled-components";
import { flexCenter } from "../../styled/styled";

const ErrorInformWrapper = styled.div`
  width: 12rem;
  height: 1.5rem;
  ${flexCenter};
  justify-content: flex-start;

  gap: 0.2rem;
  color: ${({ theme }) => theme.colors.error};
  span {
    font-size: ${(props) =>
      props.$size ? props.$size : props.theme.fontsize.sm} !important;
    font-weight: ${({ theme }) => theme.weight.lg};
  }
`;

const ErrorInform = (props) => {
  return (
    <ErrorInformWrapper $size={props.size}>
      <BiErrorCircle size={16} />

      <span>{props.text}</span>
    </ErrorInformWrapper>
  );
};

export default ErrorInform;
