import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentCategoriesAtom, currentCategoryAtom } from "../../atoms/CategoryAtom";
import DeleteConfirm from "../common/DeleteConfirm";
import { flexCenter, flexColumn, fullSize } from "../../styled/styled";

const CategoryView = (props) => {
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const [currentCategories, setCurrentCategories] = useRecoilState(currentCategoriesAtom);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState("");
  const isOnCategory = props.onClick != undefined;

  const onSetCategory = (selectedIcon, selectedText) => {
    setCurrentCategory({
      icons: selectedIcon,
      text: selectedText,
    });
    props.onClick();
  };

  const openDeleteConfirmHandler = (idx) => {
    setOpenDeleteConfirm(true);
    setSelectedIdx(idx);
  };

  const closeDeleteConfirmHandler = () => {
    setOpenDeleteConfirm(false);
    setSelectedIdx("");
  };

  const deleteCategory = () => {
    const newCategories = [...currentCategories];
    newCategories.splice(selectedIdx, 1);
    setCurrentCategories(newCategories);
    closeDeleteConfirmHandler();
  };

  return (
    <CategoryViewLayout>
      {currentCategories?.map((cate, idx) => (
        <CateBox key={"currentcategories_key=" + idx}>
          <CateIcon
            onClick={
              isOnCategory
                ? () => onSetCategory(cate.icon, cate.text)
                : () => openDeleteConfirmHandler(idx)
            }
          >
            {cate.icon}
          </CateIcon>
          <span> {cate.text}</span>
        </CateBox>
      ))}

      {openDeleteConfirm && (
        <DeleteConfirm
          onDelete={deleteCategory}
          onCancel={closeDeleteConfirmHandler}
          onClose={closeDeleteConfirmHandler}
        />
      )}
    </CategoryViewLayout>
  );
};

export default CategoryView;

const CategoryViewLayout = styled.div`
  ${fullSize}
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 1rem;
  overflow: scroll;

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(8, 1fr);
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CateBox = styled.div`
  ${flexColumn};
  align-items: center;
  gap: 0.25rem;

  span {
    color: rgb(0, 0, 0, 0.5);
  }
`;

const CateIcon = styled.div`
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  ${flexCenter};
  background: rgb(0, 0, 0, 0.1);
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontsize.xxxl};

  @media screen and (min-width: 1000px) {
    width: 6vw;
    height: 6vw;
  }
`;
