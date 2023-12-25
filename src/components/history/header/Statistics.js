import styled from "styled-components";
import utils from "../../../utils/utils";

export default function HistoryStatistics(props) {
  const { costFormatter } = utils();
  const expenses = props.currentDateHistories?.reduce((acc, cur) => {
    const isExpenses = cur.type == "지출";
    if (isExpenses) {
      const costWithoutComma = cur.cost.replace(/,/g, "");
      acc += Number(costWithoutComma);
    }
    return acc;
  }, 0);

  const income = props.currentDateHistories?.reduce((acc, cur) => {
    const isIncome = cur.type == "수입";
    if (isIncome) {
      const costWithoutComma = cur.cost.replace(/,/g, "");
      acc += Number(costWithoutComma);
    }
    return acc;
  }, 0);
  const totalCost = () => {
    const isMinus = income - expenses < 0;
    if (!isMinus) return "+" + costFormatter(income - expenses);
    else return "-" + costFormatter(income - expenses);
  };

  return (
    <HistoryStatisticsRow>
      <span>{props.current.month}월 내 소비</span>
      <span>수입 : {"+" + costFormatter(income)}원</span>
      <span>지출 : {"-" + costFormatter(expenses)}원</span>
      <span>합계 : {totalCost()}원</span>
    </HistoryStatisticsRow>
  );
}

const HistoryStatisticsRow = styled.div`
  width: 100vw;
  height: 5vh;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white

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
