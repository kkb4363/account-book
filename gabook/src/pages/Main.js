import React, { useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { moneyAtom } from '../atoms/MoneyAtom';
import StyledButton from '../components/button/StyledButton';
import CategorySelect from '../components/category/CategorySelect';
import CategoryUpdate from '../components/category/CategoryUpdate';
import MenuNavbar from '../components/common/MenuNavbar';
import MainInputs from '../components/main/AddHistory';
import MotionInputs from '../components/motion/MotionInput';
import UseHandler from '../hooks/UseHandler';
import bgimage from '../images/bg.png';
import { flexColumn, fullScreen } from '../styled/styled';

const Wrapper = styled.div`
  ${fullScreen};
  ${flexColumn};
  justify-content: center;
  align-items: center;
  background-image: url(${bgimage});
  background-size: cover;
`;

const MainText = styled.div`
  ${flexColumn};
  margin-bottom: 0;

  font-weight: ${({ theme }) => theme.weight.xxl};
  span:first-child {
    font-size: 2rem;
    text-align: center;
  }
  span:last-child {
    font-size: ${({ theme }) => theme.weight.xl};
  }
`;

const InputMoney = styled.div`
  width: 100%;
  height: 7.5vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5rem;

  @media screen and (min-width: 1000px) {
    width: 80%;
  }
`;

export const Menubar = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  cursor: pointer;

  font-size: 1.5rem;
  color: white;

  &:hover {
    color: lightgray;
  }
`;

const mainText = [
  {
    title: 'GABook',
  },
  {
    title: 'Gibeom Account Book',
  },
];

const Main = () => {
  const setMoneyAtom = useSetRecoilState(moneyAtom);
  const fields = ['addMoney', 'category', 'addCategory', 'menubar'];
  const [open, closeAll, handleToggle] = UseHandler(fields);
  const inputref = useRef('');

  const setMoney = (e) => {
    e.preventDefault();
    setMoneyAtom(inputref.current.value);
  };
  const setMoneyHandler = () => {
    setMoneyAtom(inputref.current.value);
    handleToggle('addMoney');
  };

  const openItems = [
    {
      condition: 'menubar',
      data: <MenuNavbar onClose={() => handleToggle('menubar')} />,
    },
    {
      condition: 'addMoney',
      data: (
        <MotionInputs onClose={closeAll}>
          <MainInputs
            onClose={() => handleToggle('addMoney')}
            onCategory={() => handleToggle('category')}
            onSubmit={setMoney}
          />
        </MotionInputs>
      ),
    },
    {
      condition: 'category',
      data: (
        <MotionInputs onClose={closeAll}>
          <CategorySelect
            onCategory={() => handleToggle('category')}
            onAddCate={() => handleToggle('addCategory')}
          />
        </MotionInputs>
      ),
    },
    {
      condition: 'addCategory',
      data: (
        <MotionInputs height="70vh" onClose={closeAll}>
          <CategoryUpdate onAddCate={() => handleToggle('addCategory')} />
        </MotionInputs>
      ),
    },
  ];

  return (
    <Wrapper>
      <MainText>
        {mainText.map((item, idx) => (
          <span key={'maintextkey=' + idx}>{item.title}</span>
        ))}
      </MainText>

      <InputMoney>
        <StyledButton
          onClick={setMoneyHandler}
          width={'5.5rem'}
          height={'2.5rem'}
          fontsize="1rem"
        >
          내역 추가
        </StyledButton>
      </InputMoney>

      <Menubar onClick={() => handleToggle('menubar')}>
        <GiHamburgerMenu />
      </Menubar>

      {openItems.map(
        (item, idx) =>
          open[item.condition] && (
            <React.Fragment key={'opendataskey' + idx}>{item.data}</React.Fragment>
          )
      )}
    </Wrapper>
  );
};

export default Main;
