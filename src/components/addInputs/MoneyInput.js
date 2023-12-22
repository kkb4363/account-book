import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styled from "styled-components";
import useValidate from "../../hooks/useValidate";
import { flexCenter, flexColumn } from "../../styled/styled";
import Dropdown from "../common/Dropdown";
import StyledInput from "../input/StyledInput";

const MoneyInput = (props) => {
  const { validateOnlyNumbers } = useValidate();
  const [openType, setOpenType] = useState(false);
  const [money, setMoney] = useState("");

  const handleOpenType = () => setOpenType((prev) => !prev);

  const handleSetType = (e) => {
    props.setType(e.currentTarget.name);
    handleOpenType();
  };

  const onMoneyFormat = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/\D/g, "");
    const numberWithCommas = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setMoney(numberWithCommas);
    validateOnlyNumbers(e);
  };

  return (
    <MoneyInputLayout>
      <StyledInput
        outline={"none"}
        fontsize="18px"
        type="text"
        width="60vw"
        value={money}
        bgColor="rgb(244 244 244)"
        inputRef={props.moneyRef}
        onChange={onMoneyFormat}
      />

      <DivisionCol>
        <label>구분</label>
        <span onClick={handleOpenType}>
          {props.type}
          {openType ? <BsChevronUp /> : <BsChevronDown />}
        </span>
        {openType && <Dropdown onHandle={handleSetType} />}
      </DivisionCol>
    </MoneyInputLayout>
  );
};

export default MoneyInput;

const MoneyInputLayout = styled.div`
  width: 90vw;
  height: 100%;
  ${flexCenter};
  justify-content: flex-start;
  gap: 20px;
`;

const DivisionCol = styled.div`
  ${flexColumn};
  margin: -30px 30px 0 0;
  gap: 10px;
  position: relative;

  & > label {
    font-size: ${(props) => props.theme.fontsize.sm};
    font-weight: ${(props) => props.theme.weight.lg};
  }
`;
