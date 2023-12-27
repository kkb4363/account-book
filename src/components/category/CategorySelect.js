import { MdModeEditOutline } from "react-icons/md";
import styled from "styled-components";
import { flexColumn, fullSize } from "../../styled/styled";
import PrevIcon from "../common/PrevIcon";
import { PrevBox } from "./CategoryUpdate";
import CategoryView from "./CategoryView";

const CategorySelect = (props) => {
  return (
    <CategorySelectLayout>
      <PrevBox onClick={props.onCategory}>
        <PrevIcon dark />
      </PrevBox>

      <Header>
        <HeaderTitle>
          <span>카테고리 변경</span>
          <span>변경할 카테고리를 선택해주세요</span>
        </HeaderTitle>

        <EditBox>
          <span onClick={props.onAddCate}>
            <MdModeEditOutline />
          </span>
        </EditBox>
      </Header>

      <CategoryView onClick={props.onCategory} />
    </CategorySelectLayout>
  );
};

export default CategorySelect;

const CategorySelectLayout = styled.div`
  ${fullSize};
  ${flexColumn};
  box-sizing: border-box;
  padding: 1.25rem;
`;

const Header = styled.div`
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

const EditBox = styled.div`
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
