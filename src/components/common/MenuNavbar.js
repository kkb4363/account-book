import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { flexColumn } from "../../styled/styled";
import Overlay from "./Overlay";

const MenuNavbar = (props) => {
  const navi = useNavigate();

  const test = "test입니다.";
  const navItems = [
    {
      text: "내역",
      onclick: () => navi("/history"),
    },
    {
      text: "통계",
      onclick: () => navi("/statistics"),
    },
  ];

  return (
    <>
      <MenuNavbarLayout>
        {navItems.map((item, idx) => (
          <ItemsCol onClick={item.onclick} key={idx}>
            {item.text}
          </ItemsCol>
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
  height: 100%;
  position: absolute;
  z-index: 2;
  right: 0;
  background: white;
  ${flexColumn};
  align-items: center;
  animation: ${menunavbar_keyframes} 0.2s ease-in-out;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  @media screen and (max-width: 600px) {
    width: 50%;
  }
`;

const ItemsCol = styled.div`
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
