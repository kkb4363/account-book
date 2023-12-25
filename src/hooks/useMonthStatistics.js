import { useRecoilValue } from "recoil";
import { historyAtom } from "../atoms/HistoryAtom";

export default function useMonthStatistics({ currentYear }) {
  const history = useRecoilValue(historyAtom);

  const monthlyData = {};

  history.forEach((entry) => {
    if (currentYear + "" == entry.date.substring(0, 4)) {
      const month = entry.date.substring(0, 7);
      const cost = parseFloat(entry.cost.replace(",", ""));

      if (monthlyData[month]) {
        monthlyData[month] += cost;
      } else {
        monthlyData[month] = cost;
      }
    }
  });

  const series = [];

  for (let i = 1; i <= 12; i++) {
    const month = i < 10 ? `0${i}` : `${i}`;
    const totalCost = monthlyData[`2023-${month}`] || 0;

    series.push(totalCost);
  }

  return { series };
}
