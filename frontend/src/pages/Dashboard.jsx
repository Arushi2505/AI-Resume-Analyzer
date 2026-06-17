import { useEffect, useState } from "react";
import ATSChart from "../components/ATSChart";
function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    highest: 0,
    latest: 0
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const history =
      JSON.parse(
        localStorage.getItem("analyses")
      ) || [];
    setHistory(history);
    if (history.length === 0) return;

    const scores =
      history.map(
        item => item.ats_score
      );

    const total =
      history.length;

    const average =
      (
        scores.reduce(
          (a, b) => a + b,
          0
        ) / total
      ).toFixed(1);

    const highest =
      Math.max(...scores);

    const latest =
      history[0].ats_score;

    setStats({
      total,
      average,
      highest,
      latest
    });

  }, []);
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        to-blue-100
        p-8
      "
    >
      <h1 className="text-4xl font-bold mb-2">
        Welcome back, Arushi 👋
      </h1>

      <p className="text-gray-600 mb-8">
        Here's an overview of your career analytics.
      </p>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Analyses
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.total}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Average ATS
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.average}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Highest ATS
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.highest}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Recent ATS
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.latest}%
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
            Recent Analyses
        </h2>

        {history.length === 0 ? (

            <p>No analyses yet.</p>

        ) : (

            history.slice(0, 5).map((item, index) => (

            <div
                key={index}
                className="flex justify-between border-b py-3"
            >

                <div>

                <p className="font-semibold">
                    Analysis #{history.length - index}
                </p>

                <p className="text-sm text-gray-500">
                    {item.date}
                </p>

                </div>

                <p className="font-bold text-green-600">
                {item.ats_score}%
                </p>

            </div>

            ))

        )}

        </div>

        <ATSChart history={history} />
    </div>
  );
}

export default Dashboard;