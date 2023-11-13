import styled from 'styled-components';
import { HistoryIcon, HistoryIconWrapper } from './HistoryItem';
import { useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { historyAtom } from '../../atoms/HistoryAtom';
import { currentCategoryAtom } from '../../atoms/CategoryAtom';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Dropdown from '../common/Dropdown';
import UseValidate from '../../hooks/UseValidate';

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
  justify-content: center;
  width: 100%;
  height: 60%;
`;

const UpdateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const UpdateInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1rem;
    color: rgb(0, 0, 0, 0.5);
  }
`;

const UpdateItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  input {
    border: 1px solid white;
    width: 60%;
    height: 50%;
    background: rgb(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    color: black;

    &::placeholder {
      font-size: 1.25rem;
    }
    &:focus {
      outline: none;
    }
  }

  span {
    font-size: 1.25rem;
    color: gray;
  }
`;

const SetType = styled.div`
  font-size: 1.25rem;
  color: rgb(0, 0, 0, 0.5);
  white-space: nowrap;
  cursor: pointer;
  position: relative;
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
    &:hover {
      opacity: 0.8;
    }
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

const HistoryUpdate = (props) => {
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const history = useRecoilValue(historyAtom);
  const updateCostRef = useRef('');
  const updateDetailRef = useRef('');
  const selectedHistory = history.filter((his) => his?.id == props.selectedId)[0];
  const isChangedIcon =
    selectedHistory?.category.icons != currentCategory.icons &&
    currentCategory.icons !== '';
  const [openType, setOpentype] = useState(false);
  const [changedType, setChangedType] = useState(selectedHistory.type);
  const onOpenType = () => {
    setOpentype(true);
  };
  const handleType = (e) => {
    setChangedType(e.currentTarget.name);
    e.stopPropagation();
    setOpentype(false);
  };
  const onUpdateIcon = useRecoilCallback(({ snapshot, set }) => async () => {
    if (!isChangedIcon) return;
    const historySnapshot = await snapshot.getPromise(historyAtom);
    const updatedHistory = historySnapshot.map((prev) => {
      if (prev?.id == props?.selectedId) {
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
      if (prev?.id == props?.selectedId) {
        return {
          ...prev,
          cost: updateCostValue,
        };
      } else return prev;
    });
    set(historyAtom, updatedHistory);
  });
  const onUpdateDetail = useRecoilCallback(({ snapshot, set }) => async () => {
    const updateDetailValue = updateDetailRef.current.value;
    if (updateDetailValue == '' || updateDetailValue == undefined) return;
    const historySnapshot = await snapshot.getPromise(historyAtom);
    const updatedHistory = historySnapshot.map((prev) => {
      if (prev?.id == props?.selectedId) {
        return {
          ...prev,
          detail: updateDetailValue,
        };
      } else return prev;
    });
    set(historyAtom, updatedHistory);
  });
  const onUpdateType = useRecoilCallback(({ snapshot, set }) => async () => {
    const isChangedType = selectedHistory.type != changedType;
    if (!isChangedType) return;
    const historySnapshot = await snapshot.getPromise(historyAtom);
    const updatedHistory = historySnapshot.map((prev) => {
      if (prev?.id == props?.selectedId) {
        return {
          ...prev,
          type: changedType,
        };
      } else return prev;
    });
    set(historyAtom, updatedHistory);
  });

  const onUpdate = useRecoilCallback(({ snapshot, set }) => async () => {
    await onUpdateCost();
    await onUpdateIcon();
    await onUpdateDetail();
    await onUpdateType();
    props.onClose();
  });

  const { validateOnlyNumbers } = UseValidate();

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

        <UpdateInputWrapper>
          <UpdateInput>
            <UpdateItemWrapper>
              <input
                onChange={validateOnlyNumbers}
                type="number"
                ref={updateCostRef}
                placeholder={selectedHistory?.cost + '원'}
              />
            </UpdateItemWrapper>
          </UpdateInput>

          <UpdateInput>
            <UpdateItemWrapper>
              <input ref={updateDetailRef} placeholder={selectedHistory?.detail} />
            </UpdateItemWrapper>
          </UpdateInput>
        </UpdateInputWrapper>

        <SetType onClick={onOpenType}>
          {changedType}
          {openType ? (
            <span>
              <BsChevronUp />
            </span>
          ) : (
            <span>
              <BsChevronDown />
            </span>
          )}
          {openType && <Dropdown onHandle={handleType} />}
        </SetType>
      </UpdateWrapper>

      <ButtonWrapper>
        <div onClick={props.onClose}>닫기</div>
        <div onClick={onUpdate}>수정하기</div>
      </ButtonWrapper>
    </HistoryUpdateWrapper>
  );
};

export default HistoryUpdate;
