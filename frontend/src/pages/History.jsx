import { useEffect, useState } from "react";

function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "analyses"
        )
      ) || [];

    setHistory(saved);

  }, []);

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      to-blue-100
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Analysis History
      </h1>

      <div className="
        bg-white
        rounded-2xl
        shadow
        p-6
      ">

        {history.length === 0 ? (

          <p>
            No analyses yet.
          </p>

        ) : (

          history.map(
            (item, index) => (

              <div
                key={index}
                className="
                  flex
                  justify-between
                  border-b
                  py-4
                "
              >

                <div>

                  <p className="font-bold">
                    ATS Score
                  </p>

                  <p className="
                    text-gray-500
                    text-sm
                  ">
                    {item.date}
                  </p>

                </div>

                <div className="
                  text-2xl
                  font-bold
                  text-green-600
                ">
                  {item.ats_score}%
                </div>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

export default History;