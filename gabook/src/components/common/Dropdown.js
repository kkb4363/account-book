import styled, { keyframes } from 'styled-components';

const dropdown_keyframes = keyframes`
    from{
        transform:translateY(-50px);
        opacity:0;
    }
    to{
        transform:translateY(0);
        opacity:1;
    }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: -5rem;
  width: 6rem;
  height: 6rem;
  background: white;
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.3);
  z-index: 1;

  button {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgb(0, 0, 0, 0.6);
    padding: 0.5rem;
    cursor: pointer;
    border: none;
    background: inherit;
  }
  animation: ${dropdown_keyframes} 0.5s ease-in-out;
`;

const Dropdown = (props) => {
  return (
    <DropdownWrapper>
      <button name="지출" onClick={props.onHandle}>
        지출
      </button>
      <button name="수입" onClick={props.onHandle}>
        수입
      </button>
    </DropdownWrapper>
  );
};

export default Dropdown;
