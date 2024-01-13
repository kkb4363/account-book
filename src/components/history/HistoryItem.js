import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { historyAtom } from "../../atoms/HistoryAtom";
import { flexCenter, flexColumn } from "../../styled/styled";
import utils from "../../utils/utils";
import DeleteConfirm from "../common/DeleteConfirm";
import { totalStatusAtom } from "../../atoms/TotalStatusAtom";

const HistoryItem = (props) => {
  const [history, setHistory] = useRecoilState(historyAtom);
  const { costFormatter } = utils();
  const [openDelete, setOpenDelete] = useState(false);
  const isExpenses = props?.type == "지출";
  const cost = isExpenses
    ? "-" + costFormatter(props?.cost)
    : "+" + costFormatter(props?.cost);

  const handleDelete = () => setOpenDelete((prev) => !prev);

  const setTotalStatus = useSetRecoilState(totalStatusAtom);

  const onDelete = () => {
    const month = +history?.filter((his) => his?.id == props.id)[0].date.substr(5, 2) - 1;

    const dateForTotalStatus =
      history?.filter((his) => his?.id == props.id)[0].date.substr(0, 4) +
      String(month).padStart(2, "0");

    const isAddedTotal = history?.filter((his) => his?.id == props.id)[0].isTotal;

    if (isAddedTotal)
      setTotalStatus((prev) => ({
        ...prev,
        [dateForTotalStatus]: false,
      }));

    const newDatas = history?.filter((his) => his?.id != props.id);
    setHistory(newDatas);
    setOpenDelete(false);
  };

  const [exchangeRate, setExchangeRate] = useState(0);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      axios
        .get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/krw/${props.country}.min.json`
        )
        .then((res) => setExchangeRate(res.data[props.country]));
    }

    return () => {
      ignore = true;
    };
  }, [props.country]);

  const costWithoutComma = props.cost.toString().replace(/\D/g, "");

  return (
    <HistoryItemLayout>
      <IconAndCostBox>
        <HistoryIconWrapper>
          <HistoryIcon>{props.cate?.icons}</HistoryIcon>
          <span>{props.cate?.text}</span>
        </HistoryIconWrapper>

        <HistoryCost $isExpenses={isExpenses}>
          <p>{cost}원</p>
          <span>{props?.detail}</span>
        </HistoryCost>
      </IconAndCostBox>

      <ExchangeBox>
        {props.country}:{" "}
        {(Number(exchangeRate.toFixed(4)) * Number(costWithoutComma)).toFixed(2)}
      </ExchangeBox>

      <EditIcon onClick={() => props.onEdit(props.id)}>
        <GiHamburgerMenu />
      </EditIcon>

      <EditIcon onClick={handleDelete}>
        <AiFillDelete />
      </EditIcon>

      {openDelete && (
        <DeleteConfirm
          onDelete={onDelete}
          onCancel={handleDelete}
          onClose={handleDelete}
        />
      )}
    </HistoryItemLayout>
  );
};

export default HistoryItem;

const HistoryItemLayout = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconAndCostBox = styled.div`
  display: flex;
  gap: 20px;
  width: 40%;
  height: 100%;
`;

export const HistoryIconWrapper = styled.div`
  width: 15%;
  height: 100%;
  ${flexColumn};
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  span {
    font-size: ${({ theme }) => theme.fontsize.sm};
    font-weight: ${({ theme }) => theme.weight.lg};
    color: gray;
    white-space: nowrap;
  }
`;

export const HistoryIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  ${flexCenter};
  border-radius: 50%;
  background: #ababab;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontsize.xxxl};
`;

export const HistoryCost = styled.div`
  width: 40%;
  height: 100%;
  ${flexColumn};
  justify-content: center;
  gap: 0.25rem;

  p {
    color: ${(props) =>
      props.$isExpenses ? props.theme.colors.error : props.theme.colors.blue};
    font-size: ${({ theme }) => theme.fontsize.xxl};
    @media screen and (max-width: 500px) {
      font-size: 14px;
    }

    font-weight: ${({ theme }) => theme.weight.lg};
    white-space: nowrap;
  }

  span {
    font-size: ${({ theme }) => theme.fontsize.md};
    color: rgb(0, 0, 0, 0.5);
    white-space: nowrap;
  }
`;

const ExchangeBox = styled.div`
  width: 25%;
  height: 100%;
  ${flexColumn};
  justify-content: center;
  white-space: nowrap;
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const EditIcon = styled.div`
  width: 5%;
  height: 100%;
  ${flexCenter};
  cursor: pointer;

  &:hover {
    color: gray;
  }

  font-size: ${({ theme }) => theme.fontsize.xs};
`;
