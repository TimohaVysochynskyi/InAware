import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import type { ProfileActivityPoint } from "../../model/profile.types";
import css from "./ProfileActivityChart.module.css";

type ProfileActivityChartProps = {
  activity: ProfileActivityPoint[];
};

const CHART_MAX_VALUE = 250;
const Y_AXIS_VALUES = [250, 200, 150, 100, 50, 0];

const ProfileActivityChart = ({ activity }: ProfileActivityChartProps) => {
  const chartData = activity.map((point) => ({
    month: point.month,
    value: Math.max(0, Math.min(CHART_MAX_VALUE, point.value)),
  }));

  return (
    <div className={css.chartBody}>
      <div className={css.chartFrame}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 4, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical
              horizontal={false}
              stroke="rgba(250, 194, 0, 0.12)"
              strokeWidth={1}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval={0}
              tickMargin={10}
              tick={{
                fill: "rgba(245, 245, 245, 0.65)",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
              }}
            />

            <YAxis
              type="number"
              domain={[0, CHART_MAX_VALUE]}
              ticks={Y_AXIS_VALUES}
              axisLine={false}
              tickLine={false}
              width={46}
              tickMargin={12}
              tick={{
                fill: "rgba(245, 245, 245, 0.65)",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
              }}
            />

            <Line
              type="linear"
              dataKey="value"
              stroke="#4a52ff"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#000000",
                stroke: "#4a52ff",
                strokeWidth: 4,
              }}
              activeDot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfileActivityChart;
