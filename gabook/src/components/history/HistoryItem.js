import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { historyAtom } from "../../atoms/HistoryAtom";
import { flexCenter, flexColumn } from "../../styled/styled";
import DeleteConfirm from "../common/DeleteConfirm";

const HistoryItemWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    font-weight: ${({ theme }) => theme.weight.lg};
    white-space: nowrap;
  }

  span {
    font-size: ${({ theme }) => theme.fontsize.md};
    color: rgb(0, 0, 0, 0.5);
  }
`;

const HistoryDate = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;

  p {
    font-size: ${({ theme }) => theme.fontsize.sm};
    font-weight: ${({ theme }) => theme.weight.lg};
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const EditIcon = styled.div`
  width: 5%;
  height: 100%;
  ${flexCenter};
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontsize.xs};
`;

const HistoryItem = (props) => {
  const [history, setHistory] = useRecoilState(historyAtom);
  const [openDelete, setOpenDelete] = useState(false);
  const isExpenses = props?.type == "지출";
  const cost = isExpenses ? "-" + props?.cost : "+" + props?.cost;

  const handleDelete = () => setOpenDelete((prev) => !prev);

  const onDelete = () => {
    const newDatas = history?.filter((his) => his?.id != props.id);
    setHistory(newDatas);
    setOpenDelete(false);
  };
  return (
    <HistoryItemWrapper>
      <HistoryIconWrapper>
        <HistoryIcon>{props.cate?.icons}</HistoryIcon>
        <span>{props.cate?.text}</span>
      </HistoryIconWrapper>

      <HistoryCost $isExpenses={isExpenses}>
        <p>{cost}원</p>
        <span>{props?.detail}</span>
      </HistoryCost>

      <HistoryDate>
        <p>{props?.date}</p>
      </HistoryDate>

      <EditIcon onClick={() => props.onEdit(props.id)}>
        <GiHamburgerMenu />
      </EditIcon>

      <AiFillDelete style={{ cursor: "pointer" }} onClick={handleDelete} />

      {openDelete && (
        <DeleteConfirm
          onDelete={onDelete}
          onCancel={handleDelete}
          onClose={handleDelete}
        />
      )}
    </HistoryItemWrapper>
  );
};

export default HistoryItem;
