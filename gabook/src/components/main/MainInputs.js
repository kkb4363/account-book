import styled from 'styled-components';
import StyledInput from '../input/StyledInput';
import { BsChevronDown } from 'react-icons/bs';
import StyledButton from '../button/StyledButton';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentCategoryAtom } from '../../atoms/CategoryAtom';
import { moneyAtom } from '../../atoms/MoneyAtom';
import { useRef } from 'react';
import { historyAtom } from '../../atoms/HistoryAtom';

const MainInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 1.5rem 1rem 1rem 1rem;
  gap: 1rem;
`;

const MainInputsTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  font-weight: 600;
  span:first-child {
    font-size: 18px;
  }
  span:last-child {
    font-size: 12px;
    color: lightgray;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 15%;
  background: #ebebeb;
  border-radius: 0.5rem;

  span:last-child {
    font-size: 22px;
    font-weight: 800;
    cursor: pointer;
    padding-right: 1rem;
  }
`;

const CurrentCateogry = styled.div`
  display: flex;
  padding-left: 1rem;
  width: 20%;
  align-items: center;
  height: 100%;
  gap: 1rem;

  p {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
`;

const MainInputsBtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 25%;
`;

const MainInputs = (props) => {
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const [currentMoney, setCurrentMoney] = useRecoilState(moneyAtom);
  const newMoneyRef = useRef('');
  const selectedDateRef = useRef('');

  const setHistory = useSetRecoilState(historyAtom);

  const onAddHistory = async () => {
    if (newMoneyRef?.current?.value != '') {
      await setCurrentMoney(newMoneyRef?.current?.value);
    }

    if (selectedDateRef?.current?.value == '' || currentMoney == '') return;

    setHistory((prev) => [
      ...prev,
      {
        date: selectedDateRef.current.value,
        category: currentCategory,
        cost: currentMoney,
      },
    ]);

    props.onClose();
  };

  return (
    <MainInputsWrapper>
      <MainInputsTitle>
        <span>내역추가</span>
        <span>내역을 추가해주세요</span>
      </MainInputsTitle>

      <InputWrapper>
        <CurrentCateogry onClick={props.onCategory}>
          {currentCategory && (
            <>
              <div>{currentCategory.icons}</div>
              <p>{currentCategory.text}</p>
            </>
          )}
        </CurrentCateogry>
        <span onClick={props.onCategory}>
          <BsChevronDown />
        </span>
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          outline={'none'}
          fontsize="18px"
          type="number"
          placeholder={currentMoney == '' ? '금액을 숫자만 입력해주세요' : currentMoney}
          inputRef={newMoneyRef}
        />
        <span />
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          outline={'none'}
          fontsize="18px"
          width="95%"
          type="date"
          inputRef={selectedDateRef}
        />
      </InputWrapper>

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

export default MainInputs;
