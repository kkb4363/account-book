import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentCategoriesAtom, currentCategoryAtom } from '../../atoms/CategoryAtom';
import DeleteConfirm from '../common/DeleteConfirm';
import React, { useState } from 'react';

const CagegoryViewWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 1rem;

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(8, 1fr);
  }

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CateWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

  @media screen and (min-width: 1000px) {
    width: 6vw;
    height: 6vw;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  background: rgb(0, 0, 0, 0.1);
  cursor: pointer;
`;

const CategoryView = (props) => {
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);
  const [categories, setCategories] = useRecoilState(currentCategoriesAtom);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState('');

  const setCategory = (selectedIcon, selectedText) => {
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
    setSelectedIdx('');
  };

  const deleteCategory = () => {
    const newCategories = [...categories];
    newCategories.splice(selectedIdx, 1);
    setCategories(newCategories);
    closeDeleteConfirmHandler();
  };

  const isOnCategory = props.onClick != undefined;

  return (
    <CagegoryViewWrapper>
      {categories?.map((cate, idx) => (
        <CateWrapper key={'categories_key=' + idx}>
          <CateIcon
            onClick={
              isOnCategory
                ? () => setCategory(cate.icon, cate.text)
                : () => openDeleteConfirmHandler(idx)
            }
          >
            {cate.icon}
          </CateIcon>
          <span> {cate.text}</span>
        </CateWrapper>
      ))}

      {openDeleteConfirm && (
        <DeleteConfirm
          onDelete={deleteCategory}
          onCancel={closeDeleteConfirmHandler}
          onClose={closeDeleteConfirmHandler}
        />
      )}
    </CagegoryViewWrapper>
  );
};

export default CategoryView;
