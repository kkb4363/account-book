import EmojiPicker from "emoji-picker-react";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentCategoriesAtom } from "../../atoms/CategoryAtom";
import { flexCenter, flexColumn, fullSize } from "../../styled/styled";
import StyledButton from "../button/StyledButton";
import ErrorInform from "../common/ErrorInform";
import Overlay from "../common/Overlay";
import PrevIcon from "../common/PrevIcon";
import StyledInput from "../input/StyledInput";
import CategoryView from "./CategoryView";

export default function CategoryUpdate(props) {
  return (
    <CategoryUpdateLayout>
      <PrevBox onClick={props.onAddCate}>
        <PrevIcon dark />
      </PrevBox>
      <CategoryAdd />
      <PrevCategories />
    </CategoryUpdateLayout>
  );
}

const CategoryAdd = () => {
  const setCurrentCategoriesAtom = useSetRecoilState(currentCategoriesAtom);
  const [nameError, setNameError] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [emoji, setEmoji] = useState("😀");
  const newCategoryNameRef = useRef("");
  const handleCategoryAdd = () => {
    if (newCategoryNameRef.current.value == "") {
      setNameError(true);
      return;
    }

    setCurrentCategoriesAtom((prev) => [
      ...prev,
      {
        icon: emoji,
        text: newCategoryNameRef.current.value,
      },
    ]);
    newCategoryNameRef.current.value = "";
  };

  const handleNameError = () => {
    const newCategoryNameValue = newCategoryNameRef.current.value;
    if (newCategoryNameValue == "" || newCategoryNameValue == undefined)
      setNameError(true);
    else setNameError(false);
  };

  const handleEmojiOpen = () => {
    setEmojiOpen((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    setEmoji(emoji.emoji);
    handleEmojiOpen();
  };

  return (
    <>
      <HeaderTitle>
        <span>카테고리</span>
        <span>카테고리를 추가하거나 수정할 수 있어요</span>
      </HeaderTitle>

      <AddCategoryInput>
        <SetIcon onClick={handleEmojiOpen}>{emoji}</SetIcon>
        <StyledInput
          width="100%"
          placeholder="이름을 입력해주세요"
          inputRef={newCategoryNameRef}
          borderStyle="1px solid lightgray"
          onBlur={handleNameError}
        />
        <StyledButton onClick={handleCategoryAdd} height="2.5rem">
          추가하기
        </StyledButton>
      </AddCategoryInput>

      {nameError && <ErrorInform text="카테고리 이름을 입력해주세요" />}
      {emojiOpen && (
        <>
          <EmojipickerBox>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </EmojipickerBox>
          <Overlay onClose={handleEmojiOpen} />
        </>
      )}
    </>
  );
};

const PrevCategories = () => {
  return (
    <>
      <PrevCategoryTitle>
        <span>기존 카테고리</span>
      </PrevCategoryTitle>

      <PrevCategoryViewBox>
        <CategoryView />
      </PrevCategoryViewBox>
    </>
  );
};

const CategoryUpdateLayout = styled.div`
  ${fullSize};
  ${flexColumn};
  box-sizing: border-box;
  padding: 1rem 2rem 2rem 2rem;
`;

export const PrevBox = styled.div`
  width: 80%;
  height: 10%;
  display: flex;
  align-items: center;
  margin-bottom: 5vh;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  width: 65%;
  height: 10%;
  ${flexColumn};
  gap: 0.25rem;

  font-weight: ${({ theme }) => theme.weight.lg};
  span:first-child {
    font-size: ${({ theme }) => theme.fontsize.lg};
  }
  span:last-child {
    font-size: ${({ theme }) => theme.fontsize.xs};
    color: lightgray;
  }
`;

const AddCategoryInput = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (min-width: 1000px) {
    justify-content: flex-start;
    gap: 0.5rem;
  }
`;

const SetIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  ${flexCenter};
  background: lightgray;

  font-size: ${({ theme }) => theme.fontsize.md};
`;

const EmojipickerBox = styled.div`
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
    font-size: ${({ theme }) => theme.fontsize.lg};
    font-weight: ${({ theme }) => theme.weight.lg};
  }
`;

const PrevCategoryViewBox = styled.div`
  width: 100%;
  height: 60%;
`;
