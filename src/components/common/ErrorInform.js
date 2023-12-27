import { BiErrorCircle } from "react-icons/bi";
import styled from "styled-components";
import { flexCenter } from "../../styled/styled";

const ErrorInform = (props) => {
  return (
    <ErrorInformLayout $size={props.size}>
      <BiErrorCircle size={16} />

      <span>{props.text}</span>
    </ErrorInformLayout>
  );
};

export default ErrorInform;

const ErrorInformLayout = styled.div`
  width: 12rem;
  height: 1.5rem;
  ${flexCenter};
  justify-content: flex-start;
  gap: 0.2rem;

  white-space: nowrap;
  color: ${({ theme }) => theme.colors.error};

  span {
    font-size: ${(props) =>
      props.$size ? props.$size : props.theme.fontsize.sm} !important;
    font-weight: ${({ theme }) => theme.weight.lg};
  }
`;
