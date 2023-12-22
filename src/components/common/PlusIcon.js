import styled from "styled-components";
import { flexCenter } from "../../styled/styled";
import { FaPlus } from "react-icons/fa";

const PlusIcon = ({ onClick }) => {
  return (
    <PlusIconLayout onClick={onClick}>
      <FaPlus size={25} />
    </PlusIconLayout>
  );
};

export default PlusIcon;

const PlusIconLayout = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 1px 1px 10px black;
  background-color: white;
  ${flexCenter};
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;
