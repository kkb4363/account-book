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
];

const Main = () => {
  const { open, handleToggle, openItems } = useAddHistory();

  return (
    <Wrapper>
      <ImgSlide />

      <MainText>
        {mainText.map((item, idx) => (
          <span key={"maintextkey=" + idx}>{item.title}</span>
        ))}
      </MainText>

      <Menubar onClick={() => handleToggle("menubar")}>
        <GiHamburgerMenu />
      </Menubar>

      <PlusIcon onClick={() => handleToggle("addMoney")} />

      {openItems.map(
        (item, idx) =>
          open[item.condition] && (
            <React.Fragment key={"opendataskey" + idx}>{item.data}</React.Fragment>
          )
      )}
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  ${fullScreen};
  ${flexColumn};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MainText = styled.div`
  ${flexColumn};
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

const InputMoney = styled.div`
  width: 100%;
  height: 7.5vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5rem;

  @media screen and (min-width: 1000px) {
    width: 80%;
  }
`;

export const Menubar = styled.div`
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
