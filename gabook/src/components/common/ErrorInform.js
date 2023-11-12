import styled from 'styled-components';
import { BiErrorCircle } from 'react-icons/bi';

const errorTextColor = 'rgb(190 31 39)';
const errorBgColor = 'rgb(254 233 233)';

const ErrorInformWrapper = styled.div`
  width: 12rem;
  height: 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${errorTextColor};

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.2rem;

  div {
    font-size: 1rem;
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
