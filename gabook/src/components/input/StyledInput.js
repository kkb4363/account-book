import styled from 'styled-components';

const InputWrapper = styled.input`
  width: ${({ $width }) => ($width ? $width : '18rem')};
  height: ${({ $height }) => ($height ? $height : '2.5rem')};

  background: #ebebeb;
  border: none;
  border-radius: 0.5rem;

  box-sizing: border-box;
  padding-left: 1rem;

  font-size: ${({ $fontsize }) => ($fontsize ? $fontsize : '14px')};

  &:focus {
    outline: ${({ $outline }) => ($outline ? $outline : '1px solid lightgray')};
  }

  white-space: nowrap;
`;

const StyledInput = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <InputWrapper
        $fontsize={props.fontsize}
        $width={props.width}
        $height={props.height}
        $outline={props.outline}
        ref={props.inputRef}
        placeholder={props.placeholder}
        type={props.type}
        onBlur={props.onBlur}
        max={'2050-05-05'}
        min={'2023-05-05'}
      />
    </form>
  );
};

export default StyledInput;
