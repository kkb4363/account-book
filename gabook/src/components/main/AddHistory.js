import { useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentCategoryAtom } from "../../atoms/CategoryAtom";
import { historyAtom } from "../../atoms/HistoryAtom";
import { flexColumn, fullSize } from "../../styled/styled";
import MoneyInput from "../addInputs/MoneyInput";
import StyledButton from "../button/StyledButton";
import StyledInput from "../input/StyledInput";

const MainInputsWrapper = styled.div`
  ${fullSize};
  ${flexColumn};
  box-sizing: border-box;
  padding: 1.5rem 1rem 1rem 1rem;
  gap: 1rem;
`;

const MainInputsTitle = styled.div`
  ${flexColumn};
  gap: 0.25rem;

  font-weight: ${({ theme }) => theme.weight.lg};

  span:first-child {
    font-size: ${({ theme }) => theme.fontsize.lg};
  }
  span:last-child {
    font-size: ${({ theme }) => theme.fontsize.sm};
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 0.5rem;
  position: relative;

  white-space: nowrap;
  span {
    display: flex;
    padding-right: 1rem;
    cursor: pointer;

    font-size: ${({ theme }) => theme.fontsize.xl};
    font-weight: ${({ theme }) => theme.weight.lg};
  }

  input {
    &:before {
      content: attr(placeholder);
      color: lightgray;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      pointer-events: none;
    }

    &:not(:placeholder-shown):before {
      display: none;
    }
  }
`;

const CurrentCateogry = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1rem;

  p {
    font-size: ${({ theme }) => theme.fontsize.md};
    color: rgb(0, 0, 0, 0.5);
    white-space: nowrap;
  }
`;

const MainInputsBtnWrapper = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const AddHistory = (props) => {
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const setHistory = useSetRecoilState(historyAtom);
  const [type, setType] = useState("지출");
  const selectedDateRef = useRef("");
  const detailRef = useRef("");
  const moneyRef = useRef("");
  const navi = useNavigate();

  const onAddHistory = async () => {
    if (selectedDateRef?.current?.value == "" || moneyRef.current.value == "") return;
    setHistory((prev) => [
      ...prev,
      {
        date: selectedDateRef.current.value,
        category: currentCategory,
        cost: moneyRef.current.value,
        detail: detailRef.current.value,
        id: Math.random(),
        type: type,
      },
    ]);
    props.onClose();
    navi("/history");
  };

  const showCurrentCategory = [
    {
      condition: currentCategory.text != "",
      data: (
        <>
          <div>{currentCategory.icons}</div>
          <p>{currentCategory.text}</p>
        </>
      ),
    },
    {
      condition: currentCategory.text == "",
      data: <p>카테고리를 설정해주세요</p>,
    },
  ];

  const inputItems = [
    {
      item: <MoneyInput moneyRef={moneyRef} type={type} setType={setType} />,
    },
    {
      item: (
        <>
          <CurrentCateogry onClick={props.onCategory}>
            {showCurrentCategory.map((item) => item.condition && item.data)}
          </CurrentCateogry>

          <span onClick={props.onCategory}>
            <BsChevronDown />
          </span>
        </>
      ),
    },
    {
      item: (
        <>
          <StyledInput
            outline={"none"}
            fontsize="18px"
            type="text"
            width="80vw"
            placeholder="내용을 입력해주세요"
            inputRef={detailRef}
          />
          <span />
        </>
      ),
    },
    {
      item: (
        <StyledInput
          outline={"none"}
          fontsize="18px"
          width="95%"
          type="date"
          placeholder="날짜를 선택해주세요"
          inputRef={selectedDateRef}
        />
      ),
    },
  ];
  return (
    <MainInputsWrapper>
      <MainInputsTitle>
        <span>Add History</span>
        <span>내역을 추가해주세요</span>
      </MainInputsTitle>

      {inputItems.map((item, idx) => (
        <InputWrapper key={"inputwrapperkey" + idx}>{item.item}</InputWrapper>
      ))}

      <MainInputsBtnWrapper>
        <StyledButton
          onClick={props.onClose}
          width="8rem"
          color="black"
          height="3rem"
          bgColor="white"
        >
          취소
        </StyledButton>
        <StyledButton onClick={onAddHistory} width="8rem" height="3rem">
          완료
        </StyledButton>
      </MainInputsBtnWrapper>
    </MainInputsWrapper>
  );
};

export default AddHistory;
