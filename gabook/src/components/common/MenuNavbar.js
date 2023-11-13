import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Overlay from './Overlay';

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
  position: absolute;
  right: 0;
  width: 30%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  animation: ${menunavbar_keyframes} 0.5s ease-in-out;
`;

const MenuNavbarItem = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: rgb(0, 0, 0, 0.5);
  cursor: pointer;
  margin: 1.5rem 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
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
