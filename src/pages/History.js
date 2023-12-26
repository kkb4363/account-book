import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { keyframes, styled } from "styled-components";
import { currentCategoryAtom } from "../atoms/CategoryAtom";
import CategorySelect from "../components/category/CategorySelect";
import CategoryUpdate from "../components/category/CategoryUpdate";
import PlusIcon from "../components/common/PlusIcon";
import HistoryItem from "../components/history/HistoryItem";
import HistoryUpdate from "../components/history/HistoryUpdate";
import HistoryHeader from "../components/history/header/Header";
import MotionInputs from "../components/motion/MotionInput";
import useAddHistory from "../hooks/useAddHistory";
import useCurrentMonthDatas from "../hooks/useCurrentMonthDatas";
import UseHandler from "../hooks/useHandler";
import { flexColumn, fullScreen } from "../styled/styled";

const History = () => {
  const { open: openAdd, handleToggle: handleAdd, openItems } = useAddHistory();
  const {
    current,
    setCurrent,
    currentMonthDatas,
    prevMonth,
    nextMonth,
    handleMonthPrev,
    handleMonthNext,
  } = useCurrentMonthDatas();
  const fields = ["category", "addCategory"];
  const [open, closeAll, handleToggle] = UseHandler(fields);
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const [edit, setEdit] = useState({
    open: false,
    id: "",
  });

  const handleEditOpen = (sid) => {
    setEdit({
      open: true,
      id: sid,
    });
  };

  const handleEditClose = () => {
    setEdit({
      open: false,
      id: "",
    });
    setCurrentCategory({
      icons: "",
      text: "",
    });
  };

  const handleCategoryOpen = () => handleToggle("category");

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
      <HistoryHeader {...headerProps} handleAdd={handleAdd} />
      <Body
        handleAdd={handleAdd}
        currentMonthDatas={currentMonthDatas}
        handleEditOpen={handleEditOpen}
      />

      {openItems.map(
        (item, idx) =>
          openAdd[item.condition] && (
            <React.Fragment key={idx}>{item.data}</React.Fragment>
          )
      )}

      {edit.open && (
        <MotionInputs height="30vh" onClose={handleEditClose}>
          <HistoryUpdate
            selectedId={edit.id}
            onClose={handleEditClose}
            onCate={handleCategoryOpen}
          />
        </MotionInputs>
      )}

      {open.category && (
        <MotionInputs onClose={closeAll}>
          <CategorySelect
            onCategory={handleCategoryOpen}
            onAddCate={() => handleToggle("addCategory")}
          />
        </MotionInputs>
      )}

      {open.addCategory && (
        <MotionInputs height="70vh" onClose={closeAll}>
          <CategoryUpdate onAddCate={() => handleToggle("addCategory")} />
        </MotionInputs>
      )}
    </HistoryLayout>
  );
};

export default History;

const Body = ({ handleAdd, currentMonthDatas, handleEditOpen }) => {
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
      <HistoryTitle>최근 내역</HistoryTitle>
      <HistoryCurrentCol>{result}</HistoryCurrentCol>
      <PlusIcon onClick={() => handleAdd("addMoney")} />
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

const HistoryCurrentCol = styled.div`
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

const HistoryTitle = styled.span`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 1.5rem;

  font-size: ${({ theme }) => theme.fontsize.xxxl};
  font-weight: ${({ theme }) => theme.weight.lg};
`;
