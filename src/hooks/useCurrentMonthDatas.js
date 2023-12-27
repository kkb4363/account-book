import { useState } from "react";
import { useRecoilValue } from "recoil";
import { historyAtom } from "../atoms/HistoryAtom";

export default function useCurrentMonthDatas() {
  const history = useRecoilValue(historyAtom);
  const date = new Date();
  const [current, setCurrent] = useState({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });
  const currentDate = current.year + "" + String(current.month).padStart(2, "0");

  const currentMonthDatas = history?.filter((item) => {
    const checkValue = item?.date?.slice(0, 4) + item?.date?.slice(5, 7);
    return checkValue == currentDate;
  });

  const prevMonth = current.month - 1 == 0 ? 12 : current.month - 1;
  const nextMonth = current.month + 1 == 13 ? 1 : current.month + 1;

  const handleMonthPrev = () => {
    const prevMon = current.month - 1 == 0 ? 12 : current.month - 1;
    const prevYear = prevMonth == 12 ? current.year - 1 : current.year;
    setCurrent({
      month: prevMon,
      year: prevYear,
    });
  };
  const handleMonthNext = () => {
    const nextMon = current.month + 1 == 13 ? 1 : current.month + 1;
    const nextYear = nextMon == 1 ? current.year + 1 : current.year;
    setCurrent({ month: nextMon, year: nextYear });
  };

  return {
    current,
    setCurrent,
    currentMonthDatas,
    prevMonth,
    nextMonth,
    handleMonthPrev,
    handleMonthNext,
  };
}
