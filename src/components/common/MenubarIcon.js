import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { flexCenter } from "../../styled/styled";

export default function MenubarIcon({ handleToggle, size }) {
  return (
    <MenubarIconLayout onClick={() => handleToggle("menubar")}>
      <GiHamburgerMenu size={size ? size : 24} />
    </MenubarIconLayout>
  );
}

const MenubarIconLayout = styled.div`
  ${flexCenter};
  cursor: pointer;
  color: white;
  &:hover {
    color: lightgray;
  }
`;
