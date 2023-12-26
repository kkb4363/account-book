import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { flexCenter } from "../../styled/styled";

export default function MenubarIcon({ handleToggle }) {
  return (
    <MenubarIconLayout onClick={() => handleToggle("menubar")}>
      <GiHamburgerMenu size={24} />
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
