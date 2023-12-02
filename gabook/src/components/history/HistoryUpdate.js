import { useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useRecoilCallback, useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentCategoryAtom } from "../../atoms/CategoryAtom";
import { historyAtom } from "../../atoms/HistoryAtom";
import useValidate from "../../hooks/useValidate";
import Dropdown from "../common/Dropdown";
import { HistoryIcon, HistoryIconWrapper } from "./HistoryItem";
import { flexCenter, flexColumn, fullSize } from "../../styled/styled";

const HistoryUpdateWrapper = styled.div`
  ${flexColumn};
  ${fullSize};
  box-sizing: border-box;
  padding: 2rem;

  span:nth-child(1) {
    font-size: ${({ theme }) => theme.fontsize.xl};
    font-weight: ${({ theme }) => theme.weight.lg};
  }
`;

const UpdateWrapper = styled.div`
  width: 100%;
  height: 60%;
  ${flexCenter};
`;

const UpdateInputWrapper = styled.div`
  ${fullSize};
  ${flexColumn};
`;

const UpdateInput = styled.div`
  ${fullSize};
  ${flexCenter};

  p {
    font-size: ${({ theme }) => theme.fontsize.md};
    color: rgb(0, 0, 0, 0.5);
  }
`;

const UpdateItemWrapper = styled.div`
  ${flexCenter};
  ${fullSize};

  input {
    width: 60%;
    height: 50%;
    border: 1px solid white;
    border-radius: 0.5rem;
    background: rgb(0, 0, 0, 0.1);

    color: black;

    &::placeholder {
      font-size: ${({ theme }) => theme.fontsize.xl};
    }
    &:focus {
      outline: none;
    }
  }

  span {
    font-size: ${({ theme }) => theme.fontsize.xl};
    color: gray;
  }
`;

const SetType = styled.div`
  position: relative;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontsize.xl};
  color: rgb(0, 0, 0, 0.5);
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    ${flexCenter};
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
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;

    font-weight: ${({ theme }) => theme.weight.lg};
    color: gray;
  }

  div:last-child {
    width: 70%;
    height: 100%;
    background: #3f3e3e;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    font-weight: ${({ theme }) => theme.weight.lg};
    color: white;
  }
`;

const HistoryUpdate = (props) => {
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const history = useRecoilValue(historyAtom);
  const selectedHistory = history.filter((his) => his?.id == props.selectedId)[0];
  const isChangedIcon =
    selectedHistory?.category.icons != currentCategory.icons &&
    currentCategory.icons !== "";
  const [changedType, setChangedType] = useState(selectedHistory.type);
  const [openType, setOpentype] = useState(false);
  const updateCostRef = useRef("");
  const updateDetailRef = useRef("");

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
    if (updateCostValue == "" || updateCostValue == undefined) return;
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
    if (updateDetailValue == "" || updateDetailValue == undefined) return;
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

  const { validateOnlyNumbers } = useValidate();

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
                placeholder={selectedHistory?.cost + "원"}
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
