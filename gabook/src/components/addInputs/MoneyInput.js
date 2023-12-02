import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import useValidate from "../../hooks/useValidate";
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
    <>
      <StyledInput
        outline={"none"}
        fontsize="18px"
        type="text"
        value={money}
        placeholder={"금액을 입력해주세요"}
        inputRef={props.moneyRef}
        onChange={onMoneyFormat}
      />
      <span onClick={handleOpenType}>
        {props.type}
        {openType ? <BsChevronUp /> : <BsChevronDown />}
      </span>
      {openType && <Dropdown onHandle={handleSetType} />}
    </>
  );
};

export default MoneyInput;
