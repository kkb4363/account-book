import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PrevIcon from "../../common/PrevIcon";
import HistoryStatistics from "./Statistics";
import MenubarIcon from "../../common/MenubarIcon";
import { flexCenter } from "../../../styled/styled";

export default function HistoryHeader(props) {
  const navigate = useNavigate();
  const currentDate = props.current.year + "" + props.current.month;
  return (
    <HeaderWrapper>
      <CurrentYear>
        <PrevIcon onClick={() => navigate("/")} size={20} />
        {props.current.year}
        <MenubarIcon handleToggle={props.handleAdd} size={20} />
      </CurrentYear>

      <HistoryHeaderLayout>
        <DateRow>
          <span>{props.prevMonth}</span>
          <span onClick={props.handleMonthPrev}>
            <AiOutlineLeft />
          </span>
          <span>{props.current.month}</span>
          <span onClick={props.handleMonthNext}>
            <AiOutlineRight />
          </span>
          <span>{props.nextMonth}</span>
        </DateRow>
      </HistoryHeaderLayout>

      <HistoryStatistics
        currentDateHistories={props.currentMonthDatas}
        current={props.current}
        currentDate={currentDate}
      />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  background: #3f3e3e;
  width: 100%;
  height: 25%;
`;

const CurrentYear = styled.div`
  ${flexCenter};
  width: 100%;
  height: 30%;
  justify-content: space-between;
  background: inherit;
  box-sizing: border-box;
  padding: 0 20px 0 20px;
  color: white;
`;

const HistoryHeaderLayout = styled.div`
  width: 100%;
  height: 30%;
  ${flexCenter};
  background: inherit;
  box-sizing: border-box;

  padding: 0 2rem 0.5rem 2rem;
`;

const DateRow = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;

  font-size: 2rem;
  font-weight: ${({ theme }) => theme.weight.lg};
  color: gray;

  @media screen and (max-width: 700px) {
    width: 80%;
    font-size: 1.5rem;
  }

  span:nth-child(3) {
    color: white;
  }

  span:nth-child(2),
  span:nth-child(4) {
    cursor: pointer;
  }
`;
