import type { ProfileActivityPoint } from "../../model/profile.types";
import css from "./ProfileActivityChart.module.css";

type ProfileActivityChartProps = {
  activity: ProfileActivityPoint[];
};

const CHART_MAX_VALUE = 200;
const Y_AXIS_VALUES = [200, 150, 100, 50, 0];
const CHART_HEIGHT = 340;
const PLOT_TOP = 0;
const LABELS_HEIGHT = 40;
const PLOT_HEIGHT = CHART_HEIGHT - LABELS_HEIGHT;

const ProfileActivityChart = ({ activity }: ProfileActivityChartProps) => {
  const chartData = activity.map((point) => ({
    month: point.month,
    value: Math.max(0, Math.min(CHART_MAX_VALUE, point.value)),
  }));

  const pointStep = 100 / Math.max(1, chartData.length);
  const polylinePoints = chartData
    .map((point, index) => {
      const x = pointStep * index + pointStep / 2;
      const ratio = point.value / CHART_MAX_VALUE;
      const y = PLOT_HEIGHT - ratio * (PLOT_HEIGHT - PLOT_TOP);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={css.chartBody}>
      <ul className={css.yAxis} aria-hidden="true">
        {Y_AXIS_VALUES.map((value) => (
          <li key={value} className={css.yAxisValue}>
            {value}
          </li>
        ))}
      </ul>

      <div className={css.chartFrame}>
        <div className={css.monthGrid} aria-hidden="true">
          {chartData.map((point, index) => (
            <div key={`${point.month}-${index}`} className={css.monthColumn}>
              <span className={css.monthLabel}>{point.month}</span>
            </div>
          ))}
        </div>

        <svg
          className={css.lineLayer}
          viewBox={`0 0 100 ${CHART_HEIGHT}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Лінія активності за місяцями"
        >
          <polyline className={css.linePath} points={polylinePoints} />
        </svg>
      </div>
    </div>
  );
};

export default ProfileActivityChart;
