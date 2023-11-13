import styled from 'styled-components';
import { BsChevronLeft } from 'react-icons/bs';
import { flexCenter, fullSize } from '../../styled/styled';
const PrevIconWrapper = styled.div`
  ${fullSize};
  ${flexCenter};

  font-size: ${({ theme }) => theme.fontsize.xxxl};
  font-weight: ${({ theme }) => theme.weight.lg};
`;

const PrevIcon = () => {
  return (
    <PrevIconWrapper>
      <BsChevronLeft />
    </PrevIconWrapper>
  );
};

export default PrevIcon;
