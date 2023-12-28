import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { keyframes, styled } from "styled-components";
import { currentCategoryAtom } from "../atoms/CategoryAtom";
import PlusIcon from "../components/common/PlusIcon";
import HistoryItem from "../components/history/HistoryItem";
import Header from "../components/history/header/Header";
import useAddHistory from "../hooks/useAddHistory";
import useCurrentMonthDatas from "../hooks/useCurrentMonthDatas";
import { flexColumn, fullScreen } from "../styled/styled";

const History = () => {
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const [editId, setEditId] = useState("");

  const handleEditOpen = (sid) => {
    handleToggle("edit");
    setEditId(sid);
  };

  const handleEditClose = () => {
    setCurrentCategory({
      icons: "",
      text: "",
    });
    setEditId("");
    handleToggle("edit");
  };

  const { open, handleToggle, openItems } = useAddHistory(editId, handleEditClose);

  const {
    current,
    setCurrent,
    currentMonthDatas,
    prevMonth,
    nextMonth,
    handleMonthPrev,
    handleMonthNext,
  } = useCurrentMonthDatas();

  const headerProps = {
    current,
    setCurrent,
    currentMonthDatas,
    prevMonth,
    nextMonth,
    handleMonthPrev,
    handleMonthNext,
  };

  return (
    <HistoryLayout>
      <Header {...headerProps} handleAdd={handleToggle} />
      <Body
        handleToggle={handleToggle}
        currentMonthDatas={currentMonthDatas}
        handleEditOpen={handleEditOpen}
      />

      {openItems.map(
        (item, idx) =>
          open[item.condition] && <React.Fragment key={idx}>{item.data}</React.Fragment>
      )}
    </HistoryLayout>
  );
};

export default History;

const Body = ({ handleToggle, currentMonthDatas, handleEditOpen }) => {
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
        {data.map((his) => (
          <HistoryItem
            key={Date.now()}
            cost={his.cost}
            cate={his.category}
            detail={his.detail}
            type={his.type}
            id={his.id}
            onEdit={handleEditOpen}
          />
        ))}
      </>
    ));
  return (
    <>
      <Title>최근 내역</Title>
      <ResultsCol>{result}</ResultsCol>
      <PlusIcon onClick={() => handleToggle("addMoney")} />
    </>
  );
};

const HistoryKeyframes = keyframes`
  from{
    opacity:0.2;
  }
  to{
    opacity:1;
  }
`;

const HistoryLayout = styled.div`
  ${fullScreen};
  ${flexColumn};
  animation: ${HistoryKeyframes} 0.5s ease-in-out;
`;

const ResultsCol = styled.div`
  width: 100%;
  height: 60%;
  ${flexColumn};
  gap: 1rem;
  box-sizing: border-box;
  padding: 2rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.span`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 1.5rem;

  font-size: ${({ theme }) => theme.fontsize.xxxl};
  font-weight: ${({ theme }) => theme.weight.lg};
`;
