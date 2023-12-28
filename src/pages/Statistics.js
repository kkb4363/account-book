import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenubarIcon from "../components/common/MenubarIcon";
import PrevIcon from "../components/common/PrevIcon";
import CategoryChart from "../components/statistics/CategoryChart";
import CostChart from "../components/statistics/CostChart";
import useAddHistory from "../hooks/useAddHistory";
import useCurrentMonthDatas from "../hooks/useCurrentMonthDatas";
import { flexCenter, flexColumn, fullScreen } from "../styled/styled";

export default function Statistics() {
  const { open, handleToggle, openItems } = useAddHistory();

  return (
    <StatisticsLayout>
      <Header handleToggle={handleToggle} />
      <Main />

      {openItems.map(
        (item, idx) =>
          open[item.condition] && (
            <React.Fragment key={"opendataskey" + idx}>{item.data}</React.Fragment>
          )
      )}
    </StatisticsLayout>
  );
}

const Header = ({ handleToggle }) => {
  const navigate = useNavigate();
  return (
    <HeaderLayout>
      <PrevIcon onClick={() => navigate("/")} />
      지출 통계
      <MenubarIcon handleToggle={handleToggle} />
    </HeaderLayout>
  );
};

const Main = () => {
  const { current, currentMonthDatas, handleMonthPrev, handleMonthNext } =
    useCurrentMonthDatas();

  return (
    <MainLayout>
      <div>
        <span>카테고리별</span>
        <Date>
          <AiOutlineLeft size={18} onClick={handleMonthPrev} />
          {current.year}년 {current.month}월
          <AiOutlineRight size={18} onClick={handleMonthNext} />
        </Date>
        <CategoryChart currentMonthDatas={currentMonthDatas} />
      </div>

      <div>
        <span>월별</span>
        <Date>{current.year}년</Date>
        <CostChart currentYear={current.year} />
      </div>
    </MainLayout>
  );
};

const StatisticsLayout = styled.div`
  position: relative;
  ${fullScreen};
  ${flexColumn};
`;

const HeaderLayout = styled.div`
  width: 100vw;
  height: 10vh;
  ${flexCenter};
  background-color: #3f3e3e;

  color: white;
  font-size: 22px;
  font-weight: 600;

  & > div:first-child {
    position: absolute;
    left: 3vw;
    cursor: pointer;
  }

  & > div:last-child {
    position: absolute;
    right: 3vw;
  }
`;

const MainLayout = styled.div`
  width: 100%;
  height: 90%;
  ${flexCenter};
  margin-top: 10vh;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    gap: 60px;
  }

  & > div {
    width: 100%;
    height: 100%;
    ${flexCenter};
    flex-direction: column;
    gap: 20px;

    font-size: 18px;
    font-weight: 600;
    color: #3f3e3e;

    & > span {
      font-size: 24px;
      font-weight: 600;
    }
  }
`;

const Date = styled.div`
  ${flexCenter};
  gap: 20px;
  cursor: pointer;
`;
