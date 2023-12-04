import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { styled } from "styled-components";
import PlusIcon from "../components/common/PlusIcon";
import ImgSlide from "../components/main/ImgSlide";
import useAddHistory from "../hooks/useAddHistory";
import { flexColumn, fullScreen } from "../styled/styled";

const mainText = [
  {
    title: "GABook",
  },
  {
    title: "누구나 간편하게 사용가능한 가게부 웹사이트입니다",
  },
  {
    title: "데이터는 로컬스토리지에 저장됩니다.",
  },
  {
    title: "따라서 인터넷 사용기록을 지우게 되면 데이터가 삭제되니 주의해주세요.",
  },
];

const Main = () => {
  const { open, handleToggle, openItems } = useAddHistory();

  return (
    <MainLayout>
      <ImgSlide />

      <MainText>
        {mainText.map((item, idx) => (
          <span key={"maintextkey=" + idx}>{item.title}</span>
        ))}
      </MainText>

      <MenubarIcon onClick={() => handleToggle("menubar")}>
        <GiHamburgerMenu />
      </MenubarIcon>

      <PlusIcon onClick={() => handleToggle("addMoney")} />

      {openItems.map(
        (item, idx) =>
          open[item.condition] && (
            <React.Fragment key={"opendataskey" + idx}>{item.data}</React.Fragment>
          )
      )}
    </MainLayout>
  );
};

export default Main;

const MainLayout = styled.div`
  ${fullScreen};
  ${flexColumn};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MainText = styled.div`
  ${flexColumn};
  align-items: center;
  margin-bottom: 0;
  gap: 5px;

  color: white;
  font-weight: ${({ theme }) => theme.weight.xxl};
  span:first-child {
    font-size: 2rem;
    text-align: center;
  }
  span:last-child {
    font-size: ${({ theme }) => theme.weight.xl};
  }
`;

const MenubarIcon = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  cursor: pointer;

  font-size: 1.5rem;
  color: white;

  &:hover {
    color: lightgray;
  }
`;
