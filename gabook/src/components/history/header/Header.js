import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { flexColumn } from "../../../styled/styled";
import { useNavigate } from "react-router-dom";
import HistoryStatistics from "./Statistics";

export default function HistoryHeader(props) {
  const navigate = useNavigate();

  const prevMonth = props.current.month - 1 == 0 ? 12 : props.current.month - 1;
  const nextMonth = props.current.month + 1 == 13 ? 1 : props.current.month + 1;
  const currentDate = props.current.year + "" + props.current.month;

  const onPrevMonth = () => {
    const prevMon = props.current.month - 1 == 0 ? 12 : props.current.month - 1;
    const prevYear = prevMonth == 12 ? props.current.year - 1 : props.current.year;
    props.setCurrent({
      month: prevMon,
      year: prevYear,
    });
  };
  const onNextMonth = () => {
    const nextMon = props.current.month + 1 == 13 ? 1 : props.current.month + 1;
    const nextYear = nextMon == 1 ? props.current.year + 1 : props.current.year;
    props.setCurrent({ month: nextMon, year: nextYear });
  };

  return (
    <HistoryHeaderLayout>
      <div onClick={() => navigate("/")}>
        <AiOutlineLeft />
      </div>

      <DateRow>
        <span>{prevMonth}</span>
        <span onClick={onPrevMonth}>
          <AiOutlineLeft />
        </span>
        <span>{props.current.month}</span>
        <span onClick={onNextMonth}>
          <AiOutlineRight />
        </span>
        <span>{nextMonth}</span>
      </DateRow>

      <HistoryStatistics
        currentDateHistories={props.currentDateHistories}
        current={props.current}
        currentDate={currentDate}
      />
    </HistoryHeaderLayout>
  );
}

const HistoryHeaderLayout = styled.div`
  width: 100%;
  height: 30%;
  ${flexColumn};
  justify-content: space-evenly;
  background: #3f3e3e;
  box-sizing: border-box;
  padding: 0 2rem 0 2rem;

  div:first-child {
    cursor: pointer;

    color: white;
    font-size: ${({ theme }) => theme.fontsize.xxxl};
  }
`;

const DateRow = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;

  font-size: 2rem;
  font-weight: ${({ theme }) => theme.weight.lg};
  color: gray;

  span:nth-child(3) {
    color: white;
  }

  span:nth-child(2),
  span:nth-child(4) {
    cursor: pointer;
  }

  @media screen and (min-width: 1000px) {
    margin: 0 auto;
    width: 50%;
  }
`;

const StatisticsRow = styled.div`
  width: 100vw;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 -2.5rem -2rem;
  background-color: white;

  font-size: ${({ theme }) => theme.fontsize.sm};
  font-weight: ${({ theme }) => theme.weight.lg};
  color: black;

  span:first-child {
    color: gray;
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.blue};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.error};
  }
`;
