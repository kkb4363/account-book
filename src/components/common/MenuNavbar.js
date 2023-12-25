import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Overlay from "./Overlay";
import { flexColumn } from "../../styled/styled";

const MenuNavbar = (props) => {
  const navi = useNavigate();

  const navItems = [
    {
      text: "History",
      onclick: () => navi("/history"),
    },
    {
      text: "Statistics",
      onclick: () => navi("/statistics"),
    },
  ];
  return (
    <>
      <MenuNavbarLayout>
        {navItems.map((item, idx) => (
          <MenuNavbarItem onClick={item.onclick} key={"menunavbarkey=" + idx}>
            {item.text}
          </MenuNavbarItem>
        ))}
      </MenuNavbarLayout>
      <Overlay onClose={props.onClose} />
    </>
  );
};

export default MenuNavbar;

const menunavbar_keyframes = keyframes`
    from{
        opacity:0.5;
        transform:translateX(200px);
    }
    to{
        opacity:1;
        transform:translateX(0);
    }
`;

const MenuNavbarLayout = styled.div`
  width: 30%;
  height: 100vh;
  position: absolute;
  z-index: 1;
  right: 0;
  background: white;
  ${flexColumn};
  align-items: center;
  animation: ${menunavbar_keyframes} 0.5s ease-in-out;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const MenuNavbarItem = styled.div`
  margin: 1.5rem 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontsize.xl};
  font-weight: ${({ theme }) => theme.weight.xxl};
  color: rgb(0, 0, 0, 0.8);

  &:hover {
    color: rgb(0, 0, 0, 0.5);
  }
`;
