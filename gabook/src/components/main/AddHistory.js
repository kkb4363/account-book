import { useRef, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { currentCategoryAtom } from '../../atoms/CategoryAtom';
import { historyAtom } from '../../atoms/HistoryAtom';
import StyledButton from '../button/StyledButton';
import Dropdown from '../common/Dropdown';
import StyledInput from '../input/StyledInput';
import UseValidate from '../../hooks/UseValidate';

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
    font-size: 0.85rem;
    color: rgb(0, 0, 0, 0.4);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
  background: white;
  border-radius: 0.5rem;
  white-space: nowrap;
  position: relative;

  span {
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    padding-right: 1rem;
    display: flex;
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
    font-size: 1rem;
    color: rgb(0, 0, 0, 0.5);
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

const AddHistory = (props) => {
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const setHistory = useSetRecoilState(historyAtom);
  const [openType, setOpenType] = useState(false);
  const [selectedType, setSelectedType] = useState('지출');
  const selectedDateRef = useRef('');
  const moneyRef = useRef('');
  const detailRef = useRef('');
  const navi = useNavigate();

  const onAddHistory = async () => {
    if (selectedDateRef?.current?.value == '' || moneyRef.current.value == '') return;
    setHistory((prev) => [
      ...prev,
      {
        date: selectedDateRef.current.value,
        category: currentCategory,
        cost: moneyRef.current.value,
        detail: detailRef.current.value,
        id: Math.random(),
        type: selectedType,
      },
    ]);
    props.onClose();
    navi('/history');
  };

  const openTypeHandler = () => {
    setOpenType((prev) => !prev);
  };

  const handleType = (e) => {
    setSelectedType(e.currentTarget.name);
    openTypeHandler();
  };

  const showCurrentCategory = [
    {
      condition: currentCategory.text != '',
      data: (
        <>
          <div>{currentCategory.icons}</div>
          <p>{currentCategory.text}</p>
        </>
      ),
    },
    {
      condition: currentCategory.text == '',
      data: <p>카테고리를 설정해주세요</p>,
    },
  ];

  const { validateOnlyNumbers } = UseValidate();
  return (
    <MainInputsWrapper>
      <MainInputsTitle>
        <span>Add History</span>
        <span>내역을 추가해주세요</span>
      </MainInputsTitle>

      <InputWrapper>
        <CurrentCateogry onClick={props.onCategory}>
          {showCurrentCategory.map((item) => item.condition && item.data)}
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
          placeholder={'금액을 입력해주세요'}
          inputRef={moneyRef}
          onChange={validateOnlyNumbers}
        />
        <span onClick={openTypeHandler}>
          {selectedType}{' '}
          {openType ? (
            <div>
              <BsChevronUp />
            </div>
          ) : (
            <div>
              <BsChevronDown />
            </div>
          )}
        </span>
        {openType && <Dropdown onHandle={handleType} />}
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          outline={'none'}
          fontsize="18px"
          type="text"
          width="80vw"
          placeholder="내용을 입력해주세요"
          inputRef={detailRef}
        />
        <span />
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          outline={'none'}
          fontsize="18px"
          width="95%"
          type="date"
          placeholder="날짜를 선택해주세요"
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

export default AddHistory;
