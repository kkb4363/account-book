import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PrevIcon from "../../common/PrevIcon";
import HistoryStatistics from "./Statistics";

export default function HistoryHeader(props) {
  const navigate = useNavigate();
  const currentDate = props.current.year + "" + props.current.month;

  return (
    <>
      <HistoryHeaderLayout>
        <div>
          <PrevIcon onClick={() => navigate(-1)} />
        </div>

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
        currentDateHistories={props.currentDateHistories}
        current={props.current}
        currentDate={currentDate}
      />
    </>
  );
}

const HistoryHeaderLayout = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  background: #3f3e3e;
  box-sizing: border-box;
  padding: 0 2rem 0 2rem;
  position: relative;

  div:first-child {
    position: absolute;
    left: 3vw;
    top: 0;
    bottom: 0;
    cursor: pointer;

    color: white;
  }
`;

const DateRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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