import { BiErrorCircle } from 'react-icons/bi';
import styled from 'styled-components';
import { flexCenter } from '../../styled/styled';

const ErrorInformWrapper = styled.div`
  width: 12rem;
  height: 1.5rem;
  ${flexCenter};
  gap: 0.2rem;

  font-size: ${({ theme }) => theme.fontsize.sm};
  font-weight: ${({ theme }) => theme.weight.lg};
  color: ${({ theme }) => theme.colors.error};

  div {
    font-size: ${({ theme }) => theme.fontsize.md};
  }
`;

const ErrorInform = (props) => {
  return (
    <ErrorInformWrapper>
      <div>
        <BiErrorCircle />
      </div>
      <span>{props.text}</span>
    </ErrorInformWrapper>
  );
};

export default ErrorInform;
