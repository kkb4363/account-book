import styled from 'styled-components';
import { BsChevronLeft } from 'react-icons/bs';
const PrevIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  font-size: 24px;
  font-weight: 600;
`;

const PrevIcon = () => {
  return (
    <PrevIconWrapper>
      <BsChevronLeft />
    </PrevIconWrapper>
  );
};

export default PrevIcon;
