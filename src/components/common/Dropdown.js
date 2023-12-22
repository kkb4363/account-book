import styled, { keyframes } from "styled-components";
import { flexCenter } from "../../styled/styled";

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
  width: 6rem;
  height: 6rem;
  ${flexCenter};
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 6vh;
  z-index: 1;
  background: white;
  border-radius: 10px;
  border: 1px solid rgb(0, 0, 0, 0.3);
  box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.3);
  animation: ${dropdown_keyframes} 0.5s ease-in-out;

  button {
    background: inherit;
    padding: 0.5rem;
    border: none;
    cursor: pointer;

    font-size: ${({ theme }) => theme.fontsize.lg};
    font-weight: ${({ theme }) => theme.weight.lg};
    color: rgb(0, 0, 0, 0.6);
  }
`;

const Dropdown = (props) => {
  const dropdownItems = [
    {
      iname: "지출",
    },
    {
      iname: "수입",
    },
  ];

  return (
    <DropdownWrapper>
      {dropdownItems.map((item) => (
        <button key={item.iname} name={item.iname} onClick={props.onHandle}>
          {item.iname}
        </button>
      ))}
    </DropdownWrapper>
  );
};

export default Dropdown;
