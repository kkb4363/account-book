import styled from 'styled-components';
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { historyAtom } from '../../atoms/HistoryAtom';

const HistoryItemWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
`;

const HistoryIconWrapper = styled.div`
  width: 20%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 0.8rem;
    color: lightgray;
    font-weight: 500;
  }
`;

const HistoryIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #ababab;
  font-size: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const HistoryCost = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;
  height: 50%;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    white-space: nowrap;
  }
`;

const HistoryDate = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;

  p {
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    color: lightgray;
  }
`;

const EditIcon = styled.div`
  width: 15%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.8rem;
`;

const HistoryItem = (props) => {
  const isPlus = props?.cost > 0;
  const cost = isPlus ? '+' + props?.cost : props?.cost;
  const [history, setHistory] = useRecoilState(historyAtom);

  const onDelete = () => {
    const newDatas = history?.filter((his) => his.id != props.id);
    setHistory(newDatas);
  };
  return (
    <HistoryItemWrapper>
      <HistoryIconWrapper>
        <HistoryIcon>{props.cate?.icons}</HistoryIcon>
        <span>{props.cate?.text}</span>
      </HistoryIconWrapper>

      <HistoryCost>
        <p>{cost}원</p>
      </HistoryCost>

      <HistoryDate>
        <p>{props?.date}</p>
      </HistoryDate>

      <EditIcon onClick={onDelete}>
        {/* <MdModeEditOutline /> */}
        <AiFillDelete />
      </EditIcon>
    </HistoryItemWrapper>
  );
};

export default HistoryItem;
