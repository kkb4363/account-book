import { styled } from 'styled-components';
import bgimage from '../images/bgimage.png';
import StyledInput from '../components/input/StyledInput';
import StyledButton from '../components/button/StyledButton';
import { useRef, useState } from 'react';
import MotionInputs from '../components/motion/MotionInput';
import MainInputs from '../components/main/MainInputs';
import CategorySelect from '../components/category/CategorySelect';
import { useSetRecoilState } from 'recoil';
import { moneyAtom } from '../atoms/MoneyAtom';
import { useNavigate } from 'react-router-dom';
const MainTitle = 'GABook';
const MainSubTitle = 'Gibeom Account Book';
const MainTextPaddingSize = '1rem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.div`
  background-image: url(${bgimage});
  background-size: cover;
  width: 100%;
  height: 75vh;

  position: relative;
  box-sizing: border-box;
  padding-left: ${MainTextPaddingSize};
`;

const MainText = styled.div`
  display: flex;
  flex-direction: column;

  color: white;
  position: absolute;
  bottom: ${MainTextPaddingSize};
  span:first-child {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }
  span:last-child {
    font-size: 14px;
    font-weight: 600;
  }
`;

const InputMoney = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 7.5vh;
  width: 100%;
`;

const Details = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:center;

  height:17.5vh;
  width:100%:
`;

const Main = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    addMoney: false,
    category: false,
  });

  const closeOpen = () => {
    setOpen({
      addMoney: false,
      current: false,
    });
  };

  const handleCategory = () => {
    setOpen((prev) => ({
      ...prev,
      category: !prev['category'],
    }));
  };
  const handleMoney = () => {
    setOpen((prev) => ({
      ...prev,
      addMoney: !prev['addMoney'],
    }));
  };

  const detailsButtons = [
    {
      text: '최근 내역',
      name: 'current',
      onClick: () => navigate('/history'),
    },
    {
      text: '통계 확인',
      name: 'status',
      onClick: () => alert('개발 예정이에요 😅'),
    },
  ];

  const inputref = useRef('');
  const setMoneyAtom = useSetRecoilState(moneyAtom);
  const setMoney = (e) => {
    e.preventDefault();
    setMoneyAtom(inputref.current.value);
  };

  const setMoneyHandler = () => {
    setMoneyAtom(inputref.current.value);
    handleMoney();
  };

  return (
    <Wrapper>
      <MainImage>
        <MainText>
          <span>{MainTitle}</span>
          <span>{MainSubTitle}</span>
        </MainText>
      </MainImage>

      <InputMoney>
        <StyledInput
          type="number"
          placeholder={'금액을 입력해주세요'}
          inputRef={inputref}
          onSubmit={setMoney}
        />
        <StyledButton
          onClick={setMoneyHandler}
          width={'4.8rem'}
          height={'2.5rem'}
          fontsize="12px"
        >
          내역 추가
        </StyledButton>
      </InputMoney>

      <Details>
        {detailsButtons.map((btn, idx) => (
          <StyledButton
            key={idx}
            width={'7rem'}
            height={'3.5rem'}
            fontsize={'16px'}
            onClick={btn.onClick}
          >
            {btn.text}
          </StyledButton>
        ))}
      </Details>

      {open.addMoney && (
        <MotionInputs onClose={closeOpen}>
          <MainInputs
            onClose={handleMoney}
            onCategory={handleCategory}
            onSubmit={setMoney}
          />
        </MotionInputs>
      )}

      {open.category && (
        <MotionInputs onClose={closeOpen}>
          <CategorySelect onCategory={handleCategory} x />
        </MotionInputs>
      )}
    </Wrapper>
  );
};

export default Main;
