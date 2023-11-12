import styled from 'styled-components';
import { HistoryCost, HistoryIcon, HistoryIconWrapper } from './HistoryItem';
import { useRef, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { historyAtom } from '../../atoms/HistoryAtom';
import { currentCategoryAtom } from '../../atoms/CategoryAtom';

const HistoryUpdateWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 2rem;

  span:nth-child(1) {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const UpdateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 30%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 10px black;
    cursor: pointer;
  }

  div:first-child {
    width: 30%;
    height: 100%;
    background: white;
    color: gray;
    font-weight: 600;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  div:last-child {
    width: 70%;
    height: 100%;
    background: #3f3e3e;
    color: white;
    font-weight: 600;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

const UpdateCost = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;

  input {
    border: 1px solid white;
    width: 50%;
    height: 30%;
    background: lightgray;
    border-radius: 0.5rem;
    &:focus {
      outline: none;
    }
  }

  span {
    font-size: 1.25rem;
    color: gray;
  }
`;

const HistoryUpdate = (props) => {
  const history = useRecoilValue(historyAtom);
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const [update, setUpdate] = useState(false);
  const updateCostRef = useRef('');
  const selectedHistory = history.filter((his) => his?.id == props.selectedId)[0];
  const isChangedIcon =
    selectedHistory?.category.icons != currentCategory.icons &&
    currentCategory.icons !== '';

  const handleUpdate = () => setUpdate((prev) => !prev);
  const onUpdateIcon = useRecoilCallback(({ snapshot, set }) => async () => {
    if (!isChangedIcon) return;
    const historySnapshot = await snapshot.getPromise(historyAtom);
    const updatedHistory = historySnapshot.map((prev) => {
      if (prev.id == props.selectedId) {
        return {
          ...prev,
          category: {
            icons: currentCategory.icons,
            text: currentCategory.text,
          },
        };
      } else return prev;
    });
    set(historyAtom, updatedHistory);
  });
  const onUpdateCost = useRecoilCallback(({ snapshot, set }) => async () => {
    const updateCostValue = updateCostRef.current.value;
    if (updateCostValue == '' || updateCostValue == undefined) return;
    const historySnapshot = await snapshot.getPromise(historyAtom);
    const updatedHistory = historySnapshot.map((prev) => {
      if (prev.id == props.selectedId) {
        return {
          ...prev,
          cost: updateCostValue,
        };
      }
    });
    set(historyAtom, updatedHistory);
  });
  const onUpdate = useRecoilCallback(({ snapshot, set }) => async () => {
    await onUpdateCost();
    await onUpdateIcon();
    props.onClose();
  });

  return (
    <HistoryUpdateWrapper>
      <span>수정</span>

      <UpdateWrapper>
        <HistoryIconWrapper onClick={props.onCate}>
          <HistoryIcon>
            {isChangedIcon ? currentCategory.icons : selectedHistory?.category.icons}
          </HistoryIcon>
          <span>
            {isChangedIcon ? currentCategory.text : selectedHistory?.category.text}
          </span>
        </HistoryIconWrapper>

        <HistoryCost>
          {update ? (
            <UpdateCost>
              <input ref={updateCostRef} placeholder={selectedHistory?.cost} />
              <span>원</span>
            </UpdateCost>
          ) : (
            <p onClick={handleUpdate}>{selectedHistory?.cost}원</p>
          )}
        </HistoryCost>
      </UpdateWrapper>

      <ButtonWrapper>
        <div onClick={props.onClose}>닫기</div>
        <div onClick={onUpdate}>수정하기</div>
      </ButtonWrapper>
    </HistoryUpdateWrapper>
  );
};

export default HistoryUpdate;
