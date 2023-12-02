import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { keyframes, styled } from "styled-components";
import { currentCategoryAtom } from "../atoms/CategoryAtom";
import { historyAtom } from "../atoms/HistoryAtom";
import CategorySelect from "../components/category/CategorySelect";
import CategoryUpdate from "../components/category/CategoryUpdate";
import PlusIcon from "../components/common/PlusIcon";
import HistoryItem from "../components/history/HistoryItem";
import HistoryUpdate from "../components/history/HistoryUpdate";
import MotionInputs from "../components/motion/MotionInput";
import useAddHistory from "../hooks/useAddHistory";
import UseHandler from "../hooks/useHandler";
import { flexColumn, fullScreen } from "../styled/styled";

const History = () => {
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const { open: openAdd, handleToggle: handleAdd, openItems } = useAddHistory();
  const history = useRecoilValue(historyAtom);
  const navigate = useNavigate();
  const date = new Date();
  const fields = ["category", "addCategory"];
  const [open, closeAll, handleToggle] = UseHandler(fields);
  const [edit, setEdit] = useState({
    open: false,
    id: "",
  });
  const [current, setCurrent] = useState({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });
  const prevMonth = current.month - 1 == 0 ? 12 : current.month - 1;
  const nextMonth = current.month + 1 == 13 ? 1 : current.month + 1;
  const currentDate = current.year + "" + current.month;

  const onPrevMonth = () => {
    const prevmon = current.month - 1 == 0 ? 12 : current.month - 1;
    const prevYear = prevmon === 12 ? current.year - 1 : current.year;
    setCurrent({
      month: prevmon,
      year: prevYear,
    });
  };
  const onNextMonth = () => {
    const nextmon = current.month + 1 == 13 ? 1 : current.month + 1;
    const nextYear = nextmon === 1 ? current.year + 1 : current.year;
    setCurrent({ month: nextmon, year: nextYear });
  };
  const openEditHandler = (sid) => {
    setEdit({
      open: true,
      id: sid,
    });
  };
  const closeEditHandler = () => {
    setEdit({
      open: false,
      id: "",
    });
    setCurrentCategory({
      icons: "",
      text: "",
    });
  };
  const openCategory = () => handleToggle("category");

  const currentMonthDatas = history?.filter((item) => {
    const checkValue = item?.date?.slice(0, 4) + item?.date?.slice(5, 7);
    return checkValue == currentDate;
  });

  const expenses = currentMonthDatas?.reduce((acc, cur) => {
    const isExpenses = cur.type == "지출";
    if (isExpenses) acc += Number(cur.cost);
    return acc;
  }, 0);

  const income = currentMonthDatas?.reduce((acc, cur) => {
    const isIncome = cur.type == "수입";
    if (isIncome) acc += Number(cur.cost);
    return acc;
  }, 0);

  const groupedData = currentMonthDatas.reduce((groups, item) => {
    const date = new Date(item.date);
    const day = date.getDate();
    if (!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(item);

    return groups;
  }, {});

  const groupedDataArray = Object.entries(groupedData).map(([day, dayData]) => ({
    day: day,
    data: dayData,
  }));

  const result = groupedDataArray
    .slice()
    .reverse()
    .map(({ day, data }) => (
      <>
        <span style={{ fontSize: "1rem", color: "rgb(0,0,0,0.7)" }}>{day}일</span>
        {data.map((his, idx) => (
          <HistoryItem
            key={idx}
            date={his.date}
            cost={his.cost}
            cate={his.category}
            detail={his.detail}
            type={his.type}
            id={his.id}
            onEdit={openEditHandler}
          />
        ))}
      </>
    ));

  return (
    <HistoryWrapper>
      <HistoryHeader>
        <div onClick={() => navigate("/")}>
          <AiOutlineLeft />
        </div>

        <HeaderDate>
          <span>{prevMonth}</span>
          <span onClick={onPrevMonth}>
            <AiOutlineLeft />
          </span>
          <span>{current.month}</span>
          <span onClick={onNextMonth}>
            <AiOutlineRight />
          </span>
          <span>{nextMonth}</span>
        </HeaderDate>

        <HeaderTotal>
          <span>{current.month}월 내 소비</span>
          <span>수입 : {"+" + income}원</span>
          <span>지출 : {"-" + expenses}원</span>
          <span>합계 : {income - expenses}원</span>
        </HeaderTotal>
      </HistoryHeader>

      <CurrentText>최근 내역</CurrentText>
      <CurrentHistory>{result}</CurrentHistory>

      <PlusIcon onClick={() => handleAdd("addMoney")} />

      {openItems.map(
        (item, idx) =>
          openAdd[item.condition] && (
            <React.Fragment key={idx}>{item.data}</React.Fragment>
          )
      )}

      {edit.open && (
        <MotionInputs height="30vh" onClose={closeEditHandler}>
          <HistoryUpdate
            selectedId={edit.id}
            onClose={closeEditHandler}
            onCate={openCategory}
          />
        </MotionInputs>
      )}

      {open.category && (
        <MotionInputs onClose={closeAll}>
          <CategorySelect
            onCategory={openCategory}
            onAddCate={() => handleToggle("addCategory")}
          />
        </MotionInputs>
      )}

      {open.addCategory && (
        <MotionInputs height="70vh" onClose={closeAll}>
          <CategoryUpdate onAddCate={() => handleToggle("addCategory")} />
        </MotionInputs>
      )}
    </HistoryWrapper>
  );
};

export default History;

const HistoryKeyframes = keyframes`
  from{
    opacity:0.2;
  }
  to{
    opacity:1;
  }
`;

const HistoryWrapper = styled.div`
  ${fullScreen};
  ${flexColumn};
  animation: ${HistoryKeyframes} 0.5s ease-in-out;
`;

const HistoryHeader = styled.div`
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

const HeaderDate = styled.div`
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

const HeaderTotal = styled.div`
  width: 100vw;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 -2.5rem -2rem;

  font-size: ${({ theme }) => theme.fontsize.md};
  font-weight: ${({ theme }) => theme.weight.lg};
  color: black;
  background-color: white;
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

const CurrentHistory = styled.div`
  width: 100%;
  height: 50%;
  ${flexColumn};
  gap: 1rem;
  box-sizing: border-box;
  padding: 2rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CurrentText = styled.span`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;

  font-size: ${({ theme }) => theme.fontsize.xxxl};
  font-weight: ${({ theme }) => theme.weight.lg};
`;
