import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";
import { flexCenter, fullSize } from "../../styled/styled";

const PrevIcon = ({ onClick }) => {
  return (
    <PrevIconLayout onClick={onClick}>
      <BsChevronLeft size={24} />
    </PrevIconLayout>
  );
};

export default PrevIcon;

const PrevIconLayout = styled.div`
  ${flexCenter};

  font-weight: ${({ theme }) => theme.weight.lg};
`;
