import styled from 'styled-components';
import { MdModeEditOutline } from 'react-icons/md';
import PrevIcon from '../common/PrevIcon';
import CategoryView from './CategoryView';

const CategorySelectWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.25rem;
`;

const PrevWrapper = styled.div`
  width: 10%;
  height: 10%;
  margin-left: -0.5rem;

  margin-bottom: 1rem;
`;

const CategorySelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 20%;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 65%;
  height: 100%;

  font-weight: 600;
  span:first-child {
    font-size: 18px;
  }
  span:last-child {
    font-size: 12px;
    color: lightgray;
  }
`;

const HeaderUpdateCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 25%;
  height: 100%;
  font-weight: 600;

  span:first-child {
    font-size: 18px;
  }
  span:last-child {
    font-size: 12px;
    color: lightgray;
  }
`;
const CategorySelect = (props) => {
  return (
    <CategorySelectWrapper>
      <PrevWrapper onClick={props.onCategory}>
        <PrevIcon />
      </PrevWrapper>

      <CategorySelectHeader>
        <HeaderTitle>
          <span>카테고리 변경</span>
          <span>변경할 카테고리를 선택해주세요</span>
        </HeaderTitle>

        <HeaderUpdateCategory>
          <span onClick={props.onAddCate}>
            <MdModeEditOutline />
          </span>
          <span>카테고리 수정</span>
        </HeaderUpdateCategory>
      </CategorySelectHeader>

      <CategoryView onClick={props.onCategory} />
    </CategorySelectWrapper>
  );
};

export default CategorySelect;
