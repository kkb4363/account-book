import styled from 'styled-components';
import StyledButton from '../button/StyledButton';
import Overlay from './Overlay';

const DeleteConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 1rem;
  background: white;

  width: 12rem;
  height: 8rem;

  position: absolute;
  z-index: 1;
  inset: 0;
  margin: auto auto;

  span {
    font-size: 1rem;
    font-weight: 600;

    height: 50%;
    display: flex;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  height: 50%;
  width: 100%;
`;

const DeleteConfirm = (props) => {
  return (
    <>
      <DeleteConfirmWrapper>
        <span>정말 삭제하시겠습니까?</span>
        <ButtonWrapper>
          <StyledButton onClick={props.onDelete} width="40%" height="50%">
            네
          </StyledButton>
          <StyledButton onClick={props.onCancel} width="40%" height="50%">
            아니요
          </StyledButton>
        </ButtonWrapper>
      </DeleteConfirmWrapper>
      <Overlay onClose={props.onClose} />
    </>
  );
};

export default DeleteConfirm;
