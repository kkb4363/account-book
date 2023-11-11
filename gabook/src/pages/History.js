import { keyframes, styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import HistoryItem from '../components/history/HistoryItem';
import { historyAtom } from '../atoms/HistoryAtom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HistoryKeyframes = keyframes`
  from{
    opacity:0.2;
  }
  to{
    opacity:1;
  }
`;

const HistoryWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  animation: ${HistoryKeyframes} 0.5s ease-in-out;
`;

const HistoryHeader = styled.div`
  width: 100%;
  height: 30%;
  background: #eaeaea;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  box-sizing: border-box;
  padding: 0 2rem 0 2rem;

  div:first-child {
    font-size: 1.5rem;
    margin-left: -1.5rem;
    cursor: pointer;
  }
`;

const HeaderDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 30%;

  color: lightgray;
  font-size: 2rem;
  font-weight: 600;
  span:nth-child(3) {
    color: black;
  }
`;

const HeaderTotal = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 30%;
  gap: 0.45rem;

  font-size: 14px;
  font-weight: 600;
  span:first-child {
    color: gray;
    font-size: 16px;
  }
  span:nth-child(2) {
    color: black;
  }
  span:last-child {
    color: #0075ff;
  }
`;

const CurrentHistory = styled.div`
  width: 100%;
  height: 50%;

  box-sizing: border-box;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow: scroll;
`;

const CurrentText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  width: 100%;
  height: 10%;
`;

const History = () => {
  const history = useRecoilValue(historyAtom);
  const navigate = useNavigate();

  const date = new Date();

  const [current, setCurrent] = useState({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

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

  const prevMonth = current.month - 1 == 0 ? 12 : current.month - 1;
  const nextMonth = current.month + 1 == 13 ? 1 : current.month + 1;
  const currentDate = current.year + '' + current.month;

  const validDatas = history?.filter((item) => {
    const checkValue = item.date.slice(0, 4) + item.date.slice(5, 7);
    return checkValue == currentDate;
  });

  const expenses = validDatas?.reduce((acc, cur) => {
    const isMinus = Number(cur.cost) < 0;

    if (isMinus) acc -= Number(cur.cost);

    return acc;
  }, 0);

  const income = validDatas?.reduce((acc, cur) => {
    const isMinus = Number(cur.cost) < 0;

    if (!isMinus) acc += Number(cur.cost);

    return acc;
  }, 0);

  return (
    <HistoryWrapper>
      <HistoryHeader>
        <div onClick={() => navigate('/')}>
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
          <span>{'- ' + expenses}원</span>
          <span>{'+ ' + income}원</span>
        </HeaderTotal>
      </HistoryHeader>
      <CurrentText>최근 내역</CurrentText>
      <CurrentHistory>
        {validDatas?.map((his, idx) => (
          <HistoryItem
            key={idx}
            date={his.date}
            cost={his.cost}
            cate={his.category}
            id={his.id}
          />
        ))}
      </CurrentHistory>
    </HistoryWrapper>
  );
};

export default History;
