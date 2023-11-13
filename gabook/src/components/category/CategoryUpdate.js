import EmojiPicker from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { currentCategoriesAtom } from '../../atoms/CategoryAtom';
import StyledButton from '../button/StyledButton';
import ErrorInform from '../common/ErrorInform';
import Overlay from '../common/Overlay';
import PrevIcon from '../common/PrevIcon';
import StyledInput from '../input/StyledInput';
import CategoryView from './CategoryView';

const CategoryUpdateWrapper = styled.div`
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  padding: 1rem 2rem 2rem 2rem;
  width: 100%;
  height: 100%;
`;

const PrevWrapper = styled.div`
  width: 10%;
  height: 10%;

  margin-left: -0.5rem;
  margin-top: -0.5rem;
  cursor: pointer;
  @media screen and (min-width: 1000px) {
    margin-left: -4rem;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 65%;
  height: 10%;

  font-weight: 600;
  span:first-child {
    font-size: 18px;
  }
  span:last-child {
    font-size: 12px;
    color: lightgray;
  }
`;

const AddCategoryInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  height: 10%;

  @media screen and (min-width: 1000px) {
    justify-content: flex-start;
    gap: 0.5rem;
  }
`;

const SetIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  background: lightgray;
`;

const EmojipickerWrapper = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
`;

const PrevCategoryTitle = styled.div`
  width: 60%;
  height: 10%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.425rem;

  span {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const CategoryViewWrapper = styled.div`
  width: 100%;
  height: 60%;
`;

const CategoryUpdate = (props) => {
  const newCategoryNameRef = useRef('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [icon, setIcon] = useState('😀');

  const addCategory = useSetRecoilState(currentCategoriesAtom);

  const emojiHandler = () => setEmojiOpen((prev) => !prev);
  const clickEmojiHandler = (emoji) => {
    setIcon(emoji.emoji);
    emojiHandler();
  };
  const onAddCategory = () => {
    if (newCategoryNameRef.current.value == '') {
      setNameError(true);
      return;
    }
    addCategory((prev) => [
      ...prev,
      {
        icon: icon,
        text: newCategoryNameRef.current.value,
      },
    ]);

    newCategoryNameRef.current.value = '';
  };
  const handleNameError = () => {
    if (
      newCategoryNameRef.current.value == '' ||
      newCategoryNameRef.current.value == undefined
    )
      setNameError(true);
    else setNameError(false);
  };

  return (
    <CategoryUpdateWrapper>
      <PrevWrapper onClick={props.onAddCate}>
        <PrevIcon />
      </PrevWrapper>

      <HeaderTitle>
        <span>카테고리</span>
        <span>카테고리를 추가하거나 수정할 수 있어요</span>
      </HeaderTitle>

      <AddCategoryInput>
        <SetIcon onClick={emojiHandler}>{icon}</SetIcon>

        <StyledInput
          width="12rem"
          placeholder="이름을 입력해주세요"
          inputRef={newCategoryNameRef}
          borderStyle="1px solid lightgray"
          onBlur={handleNameError}
        />
        <StyledButton onClick={onAddCategory} height="2.5rem">
          추가하기
        </StyledButton>
      </AddCategoryInput>

      {nameError && <ErrorInform text="카테고리 이름을 입력해주세요" />}

      <PrevCategoryTitle>
        <span>기존 카테고리</span>
      </PrevCategoryTitle>

      <CategoryViewWrapper>
        <CategoryView />
      </CategoryViewWrapper>

      {emojiOpen && (
        <>
          <EmojipickerWrapper>
            <EmojiPicker onEmojiClick={clickEmojiHandler} />
          </EmojipickerWrapper>
          <Overlay onClose={emojiHandler} />
        </>
      )}
    </CategoryUpdateWrapper>
  );
};

export default CategoryUpdate;
