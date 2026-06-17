import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ATSChart({ history }) {

  const data = history
    .slice()
    .reverse()
    .map((item, index) => ({
      attempt: index + 1,
      score: item.ats_score
    }));

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        ATS Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="attempt" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ATSChart;