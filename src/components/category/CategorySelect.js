import { MdModeEditOutline } from "react-icons/md";
import styled from "styled-components";
import PrevIcon from "../common/PrevIcon";
import CategoryView from "./CategoryView";
import { flexColumn, fullSize } from "../../styled/styled";

const CategorySelectWrapper = styled.div`
  ${fullSize};
  ${flexColumn};
  box-sizing: border-box;
  padding: 1.25rem;
`;

const PrevWrapper = styled.div`
  width: 5%;
  height: 10%;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const CategorySelectHeader = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 3rem;
`;

const HeaderTitle = styled.div`
  width: 65%;
  height: 100%;
  ${flexColumn};
  gap: 0.6rem;

  font-weight: ${({ theme }) => theme.weight.lg};
  span:first-child {
    font-size: ${({ theme }) => theme.fontsize.lg};
  }
  span:last-child {
    font-size: ${({ theme }) => theme.fontsize.sm};
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const HeaderUpdateCategory = styled.div`
  width: 10%;
  height: 100%;
  ${flexColumn};
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: ${({ theme }) => theme.fontsize.lg};
    font-weight: ${({ theme }) => theme.weight.lg};
    cursor: pointer;
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
        </HeaderUpdateCategory>
      </CategorySelectHeader>

      <CategoryView onClick={props.onCategory} />
    </CategorySelectWrapper>
  );
};

export default CategorySelect;
