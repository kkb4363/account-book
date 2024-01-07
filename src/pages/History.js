import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { keyframes, styled } from "styled-components";
import { currentCategoryAtom } from "../atoms/CategoryAtom";
import PlusIcon from "../components/common/PlusIcon";
import HistoryItem from "../components/history/HistoryItem";
import Header from "../components/history/header/Header";
import useAddHistory from "../hooks/useAddHistory";
import useCurrentMonthDatas from "../hooks/useCurrentMonthDatas";
import { flexCenter, flexColumn, fullScreen } from "../styled/styled";

const countries = [
  {
    name: "eur",
    korName: "EUR / 유럽",
  },
  {
    name: "usd",
    korName: "USD / 미국",
  },
  {
    name: "gbp",
    korName: "GBP / 영국",
  },
  {
    name: "brl",
    korName: "BRL / 브라질",
  },
  {
    name: "hkd",
    korName: "HKD / 홍콩",
  },
  {
    name: "jpy",
    korName: "JPY / 일본",
  },
];

export default function History() {
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
}

const Body = ({ handleToggle, currentMonthDatas, handleEditOpen }) => {
  const [country, setCountry] = useState("eur");
  const handleCountrySelect = (e) => {
    setCountry(e.target.value);
  };

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
            cost={his.cost}
            cate={his.category}
            detail={his.detail}
            type={his.type}
            id={his.id}
            onEdit={handleEditOpen}
            country={country}
          />
        ))}
      </>
    ));

  return (
    <>
      <Title>
        최근 내역
        <div>
          환율 보기 :
          <Select value={country} onChange={handleCountrySelect}>
            {countries.map((item, idx) => (
              <option value={item.name} key={item.name}>
                {item.korName}
              </option>
            ))}
          </Select>
        </div>
      </Title>
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
  width: 100%;
  height: 100vh;
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
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 1.5rem;

  font-size: ${({ theme }) => theme.fontsize.xxxl};
  @media screen and (max-width: 500px) {
    font-size: ${({ theme }) => theme.fontsize.xl};
  }
  font-weight: ${({ theme }) => theme.weight.lg};
  white-space: nowrap;

  div {
    height: 100%;
    ${flexCenter};
  }
`;

const Select = styled.select`
  height: 40%;
  width: 150px;
  margin-left: 10px;

  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: ${({ theme }) => theme.fontsize.xl};
  }
`;
