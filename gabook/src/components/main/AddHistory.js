import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentCategoryAtom } from "../../atoms/CategoryAtom";
import { historyAtom } from "../../atoms/HistoryAtom";
import { flexColumn, fullSize } from "../../styled/styled";
import DetailandCate from "../addInputs/DetailandCate";
import MoneyInput from "../addInputs/MoneyInput";
import StyledButton from "../button/StyledButton";
import StyledInput from "../input/StyledInput";

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
      data: <p>카테고리</p>,
    },
  ];

  const inputItems = [
    {
      item: (
        <InputCol>
          <label>금액</label>
          <MoneyInput moneyRef={moneyRef} type={type} setType={setType} />
        </InputCol>
      ),
    },
    {
      item: (
        <InputCol>
          <label>내용</label>
          <DetailandCate
            inputRef={detailRef}
            showCurrentCategory={showCurrentCategory}
            onCategory={props.onCategory}
          />
        </InputCol>
      ),
    },
    {
      item: (
        <InputCol>
          <label>날짜 선택</label>
          <StyledInput
            outline={"none"}
            fontsize="18px"
            width="60vw"
            type="date"
            bgColor="rgb(244 244 244)"
            inputRef={selectedDateRef}
          />
        </InputCol>
      ),
    },
  ];
  return (
    <MainInputsWrapper>
      <MainInputsTitle>
        <span>내역 추가</span>
        <span>내역을 추가해주세요</span>
      </MainInputsTitle>

      {inputItems.map((item, idx) => (
        <InputBox key={"inputwrapperkey" + idx}>{item.item}</InputBox>
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
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.weight.lg};

  span:first-child {
    font-size: ${({ theme }) => theme.fontsize.lg};
  }
  span:last-child {
    font-size: ${({ theme }) => theme.fontsize.sm};
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const InputBox = styled.div`
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
`;

const InputCol = styled.div`
  ${flexColumn};
  padding-left: 10px;
  gap: 10px;

  & > label {
    font-size: ${(props) => props.theme.fontsize.sm};
    font-weight: ${(props) => props.theme.weight.lg};
  }

  label::after {
    content: "*";
    color: red;
    margin-left: 2px;
  }
`;

const MainInputsBtnWrapper = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
`;
