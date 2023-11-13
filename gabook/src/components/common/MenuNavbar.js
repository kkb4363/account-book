import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Overlay from './Overlay';
import { flexColumn } from '../../styled/styled';

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

const MenuNavbarWrapper = styled.div`
  width: 30%;
  height: 100vh;
  position: absolute;
  z-index: 1;
  right: 0;
  background: white;
  ${flexColumn};
  align-items: center;
  animation: ${menunavbar_keyframes} 0.5s ease-in-out;
`;

const MenuNavbarItem = styled.div`
  margin: 1.5rem 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontsize.xl};
  font-weight: ${({ theme }) => theme.weight.xxl};
  color: rgb(0, 0, 0, 0.5);

  &:hover {
    color: rgb(0, 0, 0, 0.1);
  }
`;

const MenuNavbar = (props) => {
  const navi = useNavigate();

  const navItems = [
    {
      text: 'History',
      onclick: () => navi('/history'),
    },
    {
      text: 'Statistics',
      onclick: () => alert('개발 예정🧑🏼‍💻'),
    },
  ];
  return (
    <>
      <MenuNavbarWrapper>
        {navItems.map((item, idx) => (
          <MenuNavbarItem onClick={item.onclick} key={'menunavbarkey=' + idx}>
            {item.text}
          </MenuNavbarItem>
        ))}
      </MenuNavbarWrapper>
      <Overlay onClose={props.onClose} />
    </>
  );
};

export default MenuNavbar;
