import styled from 'styled-components';

const ButtonWrapper = styled.button`
  width: ${({ $width }) => ($width ? $width : '5rem')};
  height: ${({ $height }) => ($height ? $height : '5rem')};
  border-radius: 0.5rem;

  color: ${({ $color }) => ($color ? $color : 'white')};
  font-weight: 600;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ $bgColor }) => ($bgColor ? $bgColor : '#3f3e3e')};

  border: 1px solid ${({ $bgColor }) => ($bgColor ? $bgColor : 'inherit')};
`;

const StyledButton = (props) => {
  return (
    <ButtonWrapper
      onClick={props.onClick}
      $width={props.width}
      $height={props.height}
      $bgColor={props.bgColor}
      $color={props.color}
    >
      {props.children}
    </ButtonWrapper>
  );
};

export default StyledButton;
