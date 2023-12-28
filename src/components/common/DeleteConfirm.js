import styled from "styled-components";
import { flexColumn } from "../../styled/styled";
import StyledButton from "../button/StyledButton";
import Overlay from "./Overlay";

const DeleteConfirmLayout = styled.div`
  width: 12rem;
  height: 8rem;
  ${flexColumn};
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  background: white;
  position: absolute;
  z-index: 1;
  inset: 0;
  margin: auto auto;

  span {
    height: 50%;
    display: flex;
    align-items: center;

    font-size: ${({ theme }) => theme.fontsize.md};
    font-weight: ${({ theme }) => theme.weight.lg};
  }
`;

const ButtonsRow = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const DeleteConfirm = (props) => {
  const buttonItems = [
    {
      text: "네",
      onClick: props.onDelete,
    },
    {
      text: "아니요",
      onClick: props.onCancel,
    },
  ];

  return (
    <>
      <DeleteConfirmLayout>
        <span>정말 삭제하시겠습니까?</span>
        <ButtonsRow>
          {buttonItems.map((item) => (
            <StyledButton
              key={item.text}
              onClick={item.onClick}
              width={"40%"}
              height={"50%"}
            >
              {item.text}
            </StyledButton>
          ))}
        </ButtonsRow>
      </DeleteConfirmLayout>
      <Overlay onClose={props.onClose} />
    </>
  );
};

export default DeleteConfirm;
