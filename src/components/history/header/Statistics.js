import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { historyAtom } from "../../../atoms/HistoryAtom";
import { totalStatusAtom } from "../../../atoms/TotalStatusAtom";
import utils from "../../../utils/utils";
import StyledButton from "../../button/StyledButton";
import { useEffect, useState } from "react";

export default function HistoryStatistics(props) {
  const { costFormatter } = utils();
  const [isTotalMinus, setIsTotalMinus] = useState(false);

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

  const isMinus = income - Number(String(expenses).replace(/-/g, "")) < 0;

  const totalCost = () => {
    if (!isMinus) return "+" + costFormatter(income - expenses);
    else return "-" + costFormatter(income - expenses);
  };

  const [totalStatus, setTotalStatus] = useRecoilState(totalStatusAtom);
  const setHistory = useSetRecoilState(historyAtom);

  const formatedMonth = String(props.current.month).padStart(2, "0");
  const thisMonth = props.current.year + "" + formatedMonth;

  useEffect(() => {
    if (!isMinus) setIsTotalMinus(false);
    else setIsTotalMinus(true);
  }, [isMinus]);
  const handleTotalFlow = () => {
    const formatedMonth = String(props.current.month + 1).padStart(2, "0");

    setTotalStatus((prev) => ({
      ...prev,
      [thisMonth]: true,
    }));
    setHistory((prev) => [
      ...prev,
      {
        date: props.current.year + "-" + formatedMonth + "-" + "01",
        category: {
          icons: "☘️",
          text: "이전달 합계",
        },
        cost: totalCost(),
        detail: `${props.current.month}월달 합계`,
        id: Math.random(),
        type: isTotalMinus ? "지출" : "수입",
        isTotal: true,
      },
    ]);
  };

  const isAddedTotalStatus = totalStatus[thisMonth] === true;

  return (
    <HistoryStatisticsRow>
      <span>{props.current.month}월 내 소비</span>
      <span>수입 : {"+" + costFormatter(income)}원</span>
      <span>지출 : {"-" + costFormatter(expenses)}원</span>
      <span>합계 : {totalCost()}원</span>

      <StyledButton
        onClick={handleTotalFlow}
        height={"24px"}
        padding={"20px"}
        width={"150px"}
        disabled={isAddedTotalStatus}
      >
        {isAddedTotalStatus ? "추가됨" : "합계 다음달로 넘기기"}
      </StyledButton>
    </HistoryStatisticsRow>
  );
}

const HistoryStatisticsRow = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  border: 1px solid white;

  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    gap: 10px;
  }

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
