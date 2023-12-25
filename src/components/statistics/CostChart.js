import ApexCharts from "react-apexcharts";
import useMonthStatistics from "../../hooks/useMonthStatistics";

export default function CostChart({ currentYear }) {
  const { series } = useMonthStatistics({ currentYear });

  return (
    <ApexCharts
      series={[
        {
          name: `지출`,
          data: series,
        },
      ]}
      width={600}
      height={350}
      options={{
        chart: {
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
