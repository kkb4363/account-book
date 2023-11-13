import styled from 'styled-components';

const ButtonWrapper = styled.button`
  width: ${({ $width }) => ($width ? $width : '5rem')};
  height: ${({ $height }) => ($height ? $height : '5rem')};
  color: ${({ $color }) => ($color ? $color : 'white')};
  font-size: ${({ $fontsize }) => ($fontsize ? $fontsize : '14px')};
  background: ${({ $bgColor }) => ($bgColor ? $bgColor : '#3f3e3e')};
  border: 1px solid ${({ $bgColor }) => ($bgColor ? $bgColor : 'inherit')};
  font-weight: 600;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: rgb(0, 0, 0, 0.6);
  }
`;

const StyledButton = (props) => {
  return (
    <ButtonWrapper
      onClick={props.onClick}
      $width={props.width}
      $height={props.height}
      $bgColor={props.bgColor}
      $color={props.color}
      $fontsize={props.fontsize}
    >
      {props.children}
    </ButtonWrapper>
  );
};

export default StyledButton;
