import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { flexCenter } from "../../styled/styled";
import useCategoryStatistics from "../../hooks/useCategoryStatistics";
import utils from "../../utils/utils";

export default function CategoryChart({ currentMonthDatas }) {
  const { labels, series } = useCategoryStatistics({ history: currentMonthDatas });
  const { costFormatter } = utils();
  return (
    <>
      {labels.length !== 0 ? (
        <ApexCharts
          width={450}
          height={400}
          type="donut"
          series={series}
          options={{
            fill: {
              type: "gradient",
            },
            plotOptions: {
              pie: {
                startAngle: -90,
                endAngle: 270,
              },
            },
            legend: {
              position: "bottom",
            },
            chart: {
              toolbar: { show: false, type: "donut" },
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return costFormatter(val) + "원";
                },
              },
            },
            labels: labels,
          }}
        />
      ) : (
        <NoData>가게부를 추가해주세요</NoData>
      )}
    </>
  );
}

const NoData = styled.div`
  ${flexCenter}
  width: 450px;
  height: 360px;
`;
