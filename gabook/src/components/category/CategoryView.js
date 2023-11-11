import styled from 'styled-components';
import { defaultCategories } from './\bcategories';
import { useSetRecoilState } from 'recoil';
import { currentCategoryAtom } from '../../atoms/CategoryAtom';

const CagegoryViewWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
`;

const CategoryItemWrapper = styled.div`
  width: 60%;
  height: 60%;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  background: #d0d0d0;
  cursor: pointer;
`;

const CategoryView = (props) => {
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);

  const setCategory = (selectedIcon, selectedText) => {
    setCurrentCategory({
      icons: selectedIcon,
      text: selectedText,
    });
    props.onCategory();
  };

  return (
    <CagegoryViewWrapper>
      {defaultCategories.map((cate, idx) => (
        <CategoryItemWrapper
          key={'defaultcatekey=' + idx}
          onClick={() => setCategory(cate.icon, cate.text)}
        >
          {cate.icon}
        </CategoryItemWrapper>
      ))}
    </CagegoryViewWrapper>
  );
};

export default CategoryView;
