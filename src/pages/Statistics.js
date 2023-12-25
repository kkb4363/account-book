import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PrevIcon from "../components/common/PrevIcon";
import CategoryChart from "../components/statistics/CategoryChart";
import CostChart from "../components/statistics/CostChart";
import useCurrentMonthDatas from "../hooks/useCurrentMonthDatas";
import { flexCenter } from "../styled/styled";

export default function Statistics() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderLayout>
      <PrevIcon onClick={() => navigate(-1)} />
      지출 통계
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
        <MainDate>
          <AiOutlineLeft size={18} onClick={handleMonthPrev} />
          {current.year}년 {current.month}월
          <AiOutlineRight size={18} onClick={handleMonthNext} />
        </MainDate>
        <CategoryChart currentMonthDatas={currentMonthDatas} />
      </div>

      <div>
        <span>월별</span>
        <MainDate>{current.year}년</MainDate>
        <CostChart currentYear={current.year} />
      </div>
    </MainLayout>
  );
};

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
    left: 5vw;
    cursor: pointer;
  }
`;

const MainLayout = styled.div`
  width: 100vw;
  height: 90vh;
  ${flexCenter};

  & > div {
    width: 50%;
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

const MainDate = styled.div`
  ${flexCenter};
  gap: 20px;
  cursor: pointer;
`;
