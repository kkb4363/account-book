import { useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useRecoilCallback, useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentCategoryAtom } from "../../atoms/CategoryAtom";
import { historyAtom } from "../../atoms/HistoryAtom";
import useValidate from "../../hooks/useValidate";
import { flexCenter, flexColumn, fullSize } from "../../styled/styled";
import Dropdown from "../common/Dropdown";
import { HistoryIcon, HistoryIconWrapper } from "./HistoryItem";

const HistoryUpdate = (props) => {
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const history = useRecoilValue(historyAtom);
  const selectedHistory = history.filter((his) => his?.id == props.selectedId)[0];
  const isChangedIcon =
    selectedHistory?.category.icons != currentCategory.icons &&
    currentCategory.icons !== "";
  const [changedType, setChangedType] = useState(selectedHistory?.type);
  const [openType, setOpentype] = useState(false);
  const updateCostRef = useRef("");
  const updateDetailRef = useRef("");

  const handleTypeOpen = () => {
    setOpentype(true);
  };

  const handleTypeChange = (e) => {
    setChangedType(e.currentTarget.name);
    e.stopPropagation();
    setOpentype(false);
  };

  const handleEmojiUpdate = useRecoilCallback(({ snapshot, set }) => async () => {
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

  const handleCostUpdate = useRecoilCallback(({ snapshot, set }) => async () => {
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

  const handleDetailUpdate = useRecoilCallback(({ snapshot, set }) => async () => {
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

  const handleTypeUpdate = useRecoilCallback(({ snapshot, set }) => async () => {
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

  const handleUpdate = useRecoilCallback(({ snapshot, set }) => async () => {
    await handleCostUpdate();
    await handleEmojiUpdate();
    await handleDetailUpdate();
    await handleTypeUpdate();
    props.onClose();
  });

  const { validateOnlyNumbers } = useValidate();

  return (
    <HistoryUpdateLayout>
      <span>수정</span>

      <UpdateRow>
        <HistoryIconWrapper onClick={props.onCate}>
          <HistoryIcon>
            {isChangedIcon ? currentCategory.icons : selectedHistory?.category.icons}
          </HistoryIcon>
          <span>
            {isChangedIcon ? currentCategory.text : selectedHistory?.category.text}
          </span>
        </HistoryIconWrapper>

        <InputsCol>
          <UpdateInput>
            <InputBox>
              <input
                onChange={validateOnlyNumbers}
                type="number"
                ref={updateCostRef}
                placeholder={selectedHistory?.cost + "원"}
              />
            </InputBox>
          </UpdateInput>

          <UpdateInput>
            <InputBox>
              <input ref={updateDetailRef} placeholder={selectedHistory?.detail} />
            </InputBox>
          </UpdateInput>
        </InputsCol>

        <TypeBox onClick={handleTypeOpen}>
          {changedType}
          {openType ? <BsChevronUp /> : <BsChevronDown />}
          {openType && <Dropdown onHandle={handleTypeChange} />}
        </TypeBox>
      </UpdateRow>

      <ButtonsRow>
        <div onClick={props.onClose}>닫기</div>
        <div onClick={handleUpdate}>수정하기</div>
      </ButtonsRow>
    </HistoryUpdateLayout>
  );
};

export default HistoryUpdate;

const HistoryUpdateLayout = styled.div`
  ${flexColumn};
  ${fullSize};
  box-sizing: border-box;
  padding: 2rem;

  span:nth-child(1) {
    font-size: ${({ theme }) => theme.fontsize.xl};
    font-weight: ${({ theme }) => theme.weight.lg};
  }
`;

const UpdateRow = styled.div`
  width: 100%;
  height: 60%;
  ${flexCenter};
`;

const InputsCol = styled.div`
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

const InputBox = styled.div`
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

const TypeBox = styled.div`
  position: relative;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontsize.xl};
  color: rgb(0, 0, 0, 0.5);
  white-space: nowrap;
`;

const ButtonsRow = styled.div`
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
