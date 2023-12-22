import styled from "styled-components";
import StyledInput from "../input/StyledInput";
import { flexCenter, flexColumn } from "../../styled/styled";

const DetailandCate = (props) => {
  return (
    <DetailandCateLayout>
      <StyledInput
        inputRef={props.inputRef}
        outline={"none"}
        fontsize="18px"
        type="text"
        width="60vw"
        bgColor="rgb(244 244 244)"
      />

      <CategoryCol>
        <label>카테고리</label>
        <CategoryBox onClick={props.onCategory}>
          {props.showCurrentCategory.map((item) => item.condition && item.data)}
        </CategoryBox>
      </CategoryCol>
    </DetailandCateLayout>
  );
};

export default DetailandCate;

const DetailandCateLayout = styled.div`
  width: 90vw;
  height: 100%;
  ${flexCenter}
  justify-content: flex-start;
  padding-right: 50px;
  box-sizing: border-box;
`;

const CategoryBox = styled.div`
  ${flexCenter};
  width: 100%;
  justify-content: flex-start;
  cursor: pointer;
  gap: 10px;

  p {
    font-size: ${({ theme }) => theme.fontsize.lg};
    color: rgb(0, 0, 0, 0.6);
  }
`;

const CategoryCol = styled.div`
  height: 100%;
  ${flexColumn};
  gap: 15px;
  margin: -30px 0 0 20px;
  & > label {
    font-size: ${(props) => props.theme.fontsize.sm};
    font-weight: ${(props) => props.theme.weight.lg};
  }
`;
