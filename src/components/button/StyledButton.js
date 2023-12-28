import styled from "styled-components";
import { flexCenter } from "../../styled/styled";

const StyledButton = (props) => {
  return (
    <ButtonLayout
      onClick={props.onClick}
      $width={props.width}
      $height={props.height}
      $bgColor={props.bgColor}
      $color={props.color}
      $fontsize={props.fontsize}
    >
      {props.children}
    </ButtonLayout>
  );
};

export default StyledButton;

const ButtonLayout = styled.button`
  width: ${({ $width }) => ($width ? $width : "5rem")};
  height: ${({ $height }) => ($height ? $height : "5rem")};
  border: 1px solid ${({ $bgColor }) => ($bgColor ? $bgColor : "inherit")};
  border-radius: 0.5rem;
  background: ${({ $bgColor }) => ($bgColor ? $bgColor : "#3f3e3e")};

  font-size: ${({ $fontsize }) => ($fontsize ? $fontsize : "14px")};
  font-weight: ${({ theme }) => theme.weight.lg};
  color: ${({ $color }) => ($color ? $color : "white")};
  white-space: nowrap;
  cursor: pointer;

  ${flexCenter}
  &:hover {
    background: rgb(0, 0, 0, 0.6);
  }
`;
