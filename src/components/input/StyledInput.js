import styled from "styled-components";

const StyledInput = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <Input
        data-placeholder={props.placeholder}
        $fontsize={props.fontsize}
        $width={props.width}
        $height={props.height}
        $outline={props.outline}
        $borderStyle={props.borderStyle}
        $bgColor={props.bgColor}
        ref={props.inputRef}
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        onBlur={props.onBlur}
        onChange={props.onChange}
        step={props.step}
        max={"2050-05-05"}
        min={"2023-05-05"}
      />
    </form>
  );
};

export default StyledInput;

const Input = styled.input`
  width: ${({ $width }) => ($width ? $width : "18rem")};
  height: ${({ $height }) => ($height ? $height : "2.5rem")};
  box-sizing: border-box;
  padding-left: 1rem;
  background: ${({ $bgColor }) => ($bgColor ? $bgColor : "white")};
  border: ${({ $borderStyle }) => ($borderStyle ? $borderStyle : "none;")};
  border-radius: 0.5rem;

  font-size: ${({ $fontsize }) => ($fontsize ? $fontsize : "14px")};
  white-space: nowrap;

  &:focus {
    outline: ${({ $outline }) => ($outline ? $outline : "1px solid lightgray")};
  }

  &::placeholder {
    color: rgb(0, 0, 0, 0.5);
  }
`;
