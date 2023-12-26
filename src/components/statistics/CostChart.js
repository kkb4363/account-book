import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import useMonthStatistics from "../../hooks/useMonthStatistics";

export default function CostChart({ currentYear }) {
  const { series } = useMonthStatistics({ currentYear });

  const [chartWidth, setChartWidth] = useState(window.innerWidth > 600 ? 600 : 300);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth > 600 ? 600 : 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }; // 메모리 누수를 방지하기 위해 추가했습니다.
  }, []);

  return (
    <ApexCharts
      series={[
        {
          name: `지출`,
          data: series,
        },
      ]}
      width={chartWidth}
      height={350}
      options={{
        chart: {
          toolbar: {
            show: false,
          },
          type: "line",
        },
        stroke: {
          curve: "smooth",
        },
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        tooltip: {
          y: {
            formatter: function (y) {
              if (typeof y !== undefined) {
                return y.toFixed(0) + "원";
              }
              return y;
            },
          },
        },
      }}
    />
  );
}
